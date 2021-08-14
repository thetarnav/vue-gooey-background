interface XY {
	x: number
	y: number
}

const { pow } = Math

export default function getIntersection(
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
