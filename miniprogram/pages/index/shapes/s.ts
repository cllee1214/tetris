import { OriginPoint, Shape, Zone } from "./shape"

class S extends Shape {
	constructor(origin: OriginPoint, zone: Zone) {
		super(origin, zone)
		this.forms = this.makeForms(origin)
    }
    readonly name = 'S'
	makeForms(origin: OriginPoint) {
		const { x, y } = origin
		const form = [[x - 1, y + 1], [x, y + 1], [x, y], [x + 1, y]] // 躺着
		const form1 = [[x - 1, y - 1], [x - 1, y], [x, y], [x, y + 1]] // 竖着
		return [form, form1]
	}
}

export default S