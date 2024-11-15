import { OriginPoint, Shape, Zone } from "./shape";

class O extends Shape {
	constructor(origin: OriginPoint, zone: Zone) {
		super(origin, zone)
		this.forms = this.makeForms(origin)
	}
	makeForms(origin: OriginPoint) {
		const { x, y } = origin
		const form = [
			[x, y],
			[x + 1, y],
			[x, y + 1],
			[x + 1, y + 1]
		]
		return [form]
	}
}

export default O