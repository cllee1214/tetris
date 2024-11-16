import { OriginPoint, Shape, Zone } from "./shape";

class I extends Shape {
	constructor(origin: OriginPoint, zone: Zone) {
		super(origin, zone)
		this.forms = this.makeForms(origin)
    }
    readonly name = 'I'
	makeForms(origin: OriginPoint) {
		const { x, y } = origin
		const form = [
			[x, y],
			[x + 1, y],
			[x + 2, y],
			[x + 3, y]
		]
		const form2 = [
			[x, y],
			[x, y + 1],
			[x, y + 2],
			[x, y + 3]
		]
		return [form, form2]
	}
}

export default I