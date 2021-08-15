<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { useMouse, templateRef, useRafFn, useWindowSize } from '@vueuse/core'
import useElementBounds from './composables/useElementBounds'
import { lerp } from './utils/functions'
import { ellipseScale, rectScale } from './utils/geometry'

export default defineComponent({
	name: 'GooeyBackground',
	inheritAttrs: false,
	props: {
		disabled: { type: Boolean, default: false },
		ellipse: { type: Boolean, default: false },
	},
	setup(props) {
		const background = templateRef<HTMLDivElement | null>('background')
		const ball = templateRef<HTMLDivElement | null>('ball')
		const mouse = reactive(useMouse({ touch: false }))
		const bounds = useElementBounds(background, { width: 80, height: 40 })
		const { width: vw } = useWindowSize()

		const targetBallPoz = computed(() => ({
			left: mouse.x - bounds.left,
			top: mouse.y - bounds.top,
		}))

		const ballPoz = {
			left: 0,
			top: 0,
		}

		// Request Animation Frame
		useRafFn(() => {
			if (props.disabled || !ball.value || vw.value < 624) return
			ballPoz.left = lerp(ballPoz.left, targetBallPoz.value.left, 0.2)
			ballPoz.top = lerp(ballPoz.top, targetBallPoz.value.top, 0.2)

			const fromCenter = {
				x: ballPoz.left - bounds.width / 2,
				y: -(ballPoz.top - bounds.height / 2),
			}

			const p = props.ellipse
				? ellipseScale(fromCenter, bounds)
				: rectScale(fromCenter, bounds)

			ball.value.style.transform = `translate(${ballPoz.left}px, ${ballPoz.top}px) scale(${p})`
			// ball.value.style.opacity = p + ''
		})
	},
})
</script>

<template>
	<div v-bind="$attrs" class="gooey-background wrapper" :class="{ disabled }">
		<slot></slot>
		<div class="gooey-group">
			<div ref="ball" class="ball"></div>
			<div ref="background" class="background"></div>
		</div>
	</div>

	<svg class="svg-filter">
		<defs>
			<filter id="background-gooey-effect">
				<feGaussianBlur
					in="SourceGraphic"
					stdDeviation="10"
					result="blur"
				/>
				<feColorMatrix
					in="blur"
					mode="matrix"
					values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8"
					result="background-gooey-effect"
				/>
				<feComposite
					in="SourceGraphic"
					in2="background-gooey-effect"
					operator="atop"
				/>
			</filter>
		</defs>
	</svg>
</template>

<style scoped lang="scss">
@mixin inset($margin: 0) {
	top: $margin;
	left: $margin;
	bottom: $margin;
	right: $margin;
}
.wrapper {
	position: relative;
	--bg-color: #42b883;
	--bg-radius: 12px;
	--ball-size: 52px;
}

.gooey-group {
	filter: url('#background-gooey-effect');
	position: absolute;
	z-index: -1;
	@include inset;
}
.ball {
	position: absolute;
	pointer-events: none;
	z-index: -1;
	top: 0;
	left: 0;
	width: var(--ball-size);
	height: var(--ball-size);
	margin: calc(var(--ball-size) / -2) 0 0 calc(var(--ball-size) / -2);
	background: var(--bg-color);
	border-radius: 50%;

	@media screen and (max-width: 624px) {
		display: none;
	}
}

.disabled .ball {
	display: none;
}

.background {
	position: absolute;
	@include inset;
	background: var(--bg-color);
	border-radius: var(--bg-radius);
}

.svg-filter {
	position: absolute;
	pointer-events: none;
	width: 0;
	height: 0;
	display: none;
	visibility: hidden;
}
</style>
