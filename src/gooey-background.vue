<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { useMouse, templateRef, useRafFn, useWindowSize } from '@vueuse/core'
import useElementBounds from './composables/useElementBounds'
import { clamp, flipP, lerp, valToP } from './utils/functions'
import { calcHypotenuse } from './utils/geometry'
import getIntersection from './utils/intersection'

export default defineComponent({
	name: 'GooeyBackground',
	inheritAttrs: false,
	props: {
		disabled: { type: Boolean, default: false },
	},
	setup(props) {
		const background = templateRef<HTMLDivElement | null>('background')
		const dot = templateRef<HTMLDivElement | null>('dot')
		const mouse = reactive(useMouse({ touch: false }))
		const bounds = useElementBounds(background, { width: 80, height: 40 })
		const { width: vw } = useWindowSize()

		const targetDotpoz = computed(() => ({
			left: mouse.x - bounds.left,
			top: mouse.y - bounds.top,
		}))

		const dotpoz = {
			left: 0,
			top: 0,
		}

		useRafFn(() => {
			if (props.disabled || !dot.value || vw.value < 624) return
			dotpoz.left = lerp(dotpoz.left, targetDotpoz.value.left, 0.2)
			dotpoz.top = lerp(dotpoz.top, targetDotpoz.value.top, 0.2)

			const fromCenter = {
				x: dotpoz.left - bounds.width / 2,
				y: -(dotpoz.top - bounds.height / 2),
			}
			const intersection = getIntersection(
				fromCenter.x,
				fromCenter.y,
				bounds.width / 2,
				bounds.height / 2,
			)
			const r = calcHypotenuse(fromCenter.x, fromCenter.y)
			const minR = calcHypotenuse(intersection.x, intersection.y) - 12
			const maxR = minR + 40
			const p = flipP(clamp(valToP(r, minR, maxR), 0, 1))

			dot.value.style.transform = `translate(${dotpoz.left}px, ${dotpoz.top}px) scale(${p})`
			// dot.value.style.opacity = p + ''
		})
	},
})
</script>

<template>
	<div v-bind="$attrs" class="gooey-background wrapper" :class="{ disabled }">
		<slot></slot>
		<div class="gooey-group">
			<div ref="dot" class="dot"></div>
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
	--dot-size: 52px;
}

.gooey-group {
	filter: url('#background-gooey-effect');
	position: absolute;
	z-index: -1;
	@include inset;
}
.dot {
	position: absolute;
	pointer-events: none;
	z-index: -1;
	top: 0;
	left: 0;
	width: var(--dot-size);
	height: var(--dot-size);
	margin: calc(var(--dot-size) / -2) 0 0 calc(var(--dot-size) / -2);
	background: var(--bg-color);
	border-radius: 50%;

	@media screen and (max-width: 624px) {
		display: none;
	}
}

.disabled .dot {
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
