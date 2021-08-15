import { clamp, flipP, valToP } from './functions'

export interface XY {
	x: number
	y: number
}
export interface Size {
	width: number
	height: number
}

const { abs, pow } = Math

export const radToDeg = (rad: number) => rad * (180 / Math.PI)

export const calcHypotenuse = (a: number, b: number) => Math.sqrt(a * a + b * b)

/**
 * Get the point where the line (from center to the given point) and ellipse intersects
 * @param x poz x of the point from the center
 * @param y poz y of the point from the center
 * @param a x radius of the ellipse
 * @param b y radius of the ellipse
 * @returns point of intersection `(X, Y)`
 */
export function lineEllipseIntersection(
	x: number,
	y: number,
	a: number,
	b: number,
): XY {
	const m = y / x,
		ix = (a * b) / pow(pow(a, 2) * pow(m, 2) + pow(b, 2), 0.5),
		iy = (a * b * m) / pow(pow(a, 2) * pow(m, 2) + pow(b, 2), 0.5)
	return {
		x: ix,
		y: iy,
	}
}

/**
 * get distance of the point (x,y) from the borders of rectangle (w,h)
 * @param x x vector to the point from the center of the rectangle
 * @param y y vector to the point from the center of the rectangle
 * @param w width of the rectangle
 * @param h height of the rectangle
 */
export function distFromRect(
	x: number,
	y: number,
	w: number,
	h: number,
): number {
	;(x = abs(x)), (y = abs(y))
	;(w = w / 2), (h = h / 2)
	;(x -= w), (y -= h)
	if (x <= 0) return y
	if (y <= 0) return x
	return calcHypotenuse(x, y)
}

/**
 * calculate scale based on distance from ellipse shape
 * @param poz mouse position relative to the center (X, Y)
 * @param bounds width and height of the ellipse
 * @returns scale - from 0 to 1
 */
export function ellipseScale(poz: XY, bounds: Size): number {
	const intersection = lineEllipseIntersection(
		poz.x,
		poz.y,
		bounds.width / 2,
		bounds.height / 2,
	)
	const r = calcHypotenuse(poz.x, poz.y)
	const min = calcHypotenuse(intersection.x, intersection.y) - 12
	const max = min + 40
	const p = flipP(clamp(valToP(r, min, max), 0, 1))
	return p
}

/**
 * calculate scale based on distance from a rectangle
 * @param poz mouse position relative to the center (X, Y)
 * @param bounds width and height of the rectangle
 * @returns scale - from 0 to 1
 */
export function rectScale(poz: XY, bounds: Size): number {
	const dist = distFromRect(
		poz.x,
		poz.y,
		bounds.width - 10,
		bounds.height - 10,
	)
	const p = flipP(clamp(valToP(dist, 0, 20), 0, 1))
	return p
}
