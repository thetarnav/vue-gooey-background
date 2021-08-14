import { MaybeElementRef, useResizeObserver } from '@vueuse/core'
import { onMounted, reactive } from 'vue'

interface Bounds {
	left: number
	top: number
	width: number
	height: number
}

export default function useElementBounds(
	target: MaybeElementRef,
	initial?: Partial<Bounds>,
) {
	const bounds: Bounds = reactive({
		left: 0,
		top: 0,
		width: 0,
		height: 0,
	})

	initial && Object.assign(bounds, initial)

	function setElementBounds() {
		if (!target.value) return
		const { left, top, width, height } = target.value.getBoundingClientRect()
		Object.assign(bounds, { left, top, width, height })
	}
	useResizeObserver(target, setElementBounds)
	onMounted(setElementBounds)

	return bounds
}
