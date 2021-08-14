import { pToVal, valToP } from './functions'

interface XY {
	x: number
	y: number
}

const abs = (val: number) => Math.abs(val)

export const radToDeg = (rad: number) => rad * (180 / Math.PI)

export const calcHypotenuse = (a: number, b: number) => Math.sqrt(a * a + b * b)

// export function calcPXYFromScreen(e: MouseEvent): XY
// export function calcPXYFromScreen(clientX: number, clientY: number): XY
// export function calcPXYFromScreen(a: number | MouseEvent, b?: number): XY {
// 	let clientX: number, clientY: number
// 	if (typeof a === 'number') [clientX, clientY] = [a, b]
// 	else ({ clientX, clientY } = a)

// 	const { innerHeight: vh, innerWidth: vw } = window,
// 		minAxis = Math.min(vw, vh)

// 	let x = clientX - vw / 2,
// 		y = vh - clientY - vh / 2

// 	;(x = valToP(x, 0, minAxis / 2)), (y = valToP(y, 0, minAxis / 2))

// 	return {
// 		x,
// 		y,
// 	}
// }

// export function calcScreenXY<T extends Partial<XY>>(xy: T): T {
// 	const { innerHeight: vh, innerWidth: vw } = window,
// 		minAxis = Math.min(vw, vh)
// 	let { x, y } = xy

// 	if (x !== undefined)
// 		x = pToVal((xy.x + 1) / 2, vw / 2 - minAxis / 2, vw / 2 + minAxis / 2)
// 	if (y !== undefined)
// 		y = pToVal((xy.y + 1) / 2, vh / 2 + minAxis / 2, vh / 2 - minAxis / 2)

// 	// @ts-ignore
// 	return {
// 		x,
// 		y,
// 	}
// }

export function clampSquare(x: number, y: number): XY {
	let sx = abs(x / y) < 1 ? 1 * (x / y) : 1,
		sy = abs(y / x) < 1 ? 1 * (y / x) : 1

	if (x * sx < 0) sx *= -1
	if (y * sy < 0) sy *= -1

	if (abs(sx) > abs(x)) sx = x
	if (abs(sy) > abs(y)) sy = y

	return {
		x: sx,
		y: sy,
	}
}

export function clampCircle(x: number, y: number): XY {
	const { x: sx, y: sy } = clampSquare(x, y),
		r = calcHypotenuse(sx, sy)
	;(x = r > 1 ? sx / r : x), (y = r > 1 ? sy / r : y)

	return {
		x,
		y,
	}
}
