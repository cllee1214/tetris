type Status = 0 | 1 | 2
interface Block {
	x: number,
	y: number,
	key: string,
	status: Status,
	bg: 'red' | '#fff' | 'gray'
}

interface OriginPoint {
	x: number
	y: number
}
interface Zone {
	width: number
	height: number
}
type Direction = 'left' | 'right' | 'down'
type Forms = number[][][]
abstract class Shape {
	protected origin = {
		x: 0,
		y: 0
	}
	protected forms: Forms = []
	protected formIndex: number = 0
	zone: Zone = { width: 0, height: 0 }
	currentForm: number[][] = []
	// nextDownForm: 
	active = true
	constructor(origin: OriginPoint, zone: Zone) {
		this.origin.x = origin.x
		this.origin.y = origin.y
		this.zone.height = zone.height
		this.zone.width = zone.width
	}
	abstract makeForms(): number[][][]
	abstract checkLeft(): boolean
	abstract checkRight(): boolean
	abstract checkTransform(): boolean
	getNextDownFrom() {
		const currentForm = this.currentForm
		const newCurrentForm = currentForm.map(point => {
			return [point[0], point[1] + 1]
		})
		return newCurrentForm
	}
	findMinHeightPoint() {
		const currentForm = this.currentForm
		let result: number[] = []
		currentForm.forEach((point, index) => {
			if (index === 0) {
				result = point
			} else {
				if (point[1] > result[1]) {
					result = point
				}
			}
		})
		return result
	}
	transform() {
		const index = (this.formIndex + 1) > this.forms.length - 1 ? 0 : this.formIndex + 1
		this.formIndex = index
		this.currentForm = this.forms[index]
	}
	move(direction: Direction) {
		// console.log(this.origin)
		switch (direction) {
			case 'left':
				this.origin.x--
				break;
			case 'right':
				this.origin.x++
				break;
			case 'down':
				this.origin.y++
				break;
			default:
				break;
		}
		// 根据新的原点
		this.forms = this.makeForms()
		this.currentForm = this.forms[this.formIndex]
	}
	init() {
		// const index = Math.floor(this.forms.length * Math.random())
		const index = this.formIndex
		this.currentForm = this.forms[index]
	}
}

class S extends Shape {
	constructor(origin: OriginPoint, zone: Zone) {
		super(origin, zone)
		this.forms = this.makeForms()
	}
	makeForms() {
		const { x, y } = this.origin
		const form = [[x - 1, y + 1], [x, y + 1], [x, y], [x + 1, y]] // 躺着
		const form1 = [[x - 1, y - 1], [x - 1, y], [x, y], [x, y + 1]] // 竖着
		return [form, form1]
	}
	checkCollision() {

	}
	checkTransform() {
		const formIndex = this.formIndex
		const { x, y } = this.origin
		const width = this.zone.width
		// 竖着 且 贴右边边界
		if(formIndex === 1 && x === width - 1) {
			return false
		}
		// todo 检查变形是否会和固定下来的元素碰撞
		return true
	}
	checkLeft() {
		return this.origin.x > 1
	}
	checkRight() {
		const { width } = this.zone
		const { x } = this.origin
		const formIndex = this.formIndex
		if (formIndex === 0) {
			return x < width - 2
		} else if (formIndex === 1) {
			return x <= width - 2
		} else {
			return true
		}
	}
}


export type ShapeCollection = S

export {
	S,

	Block,
	Status
}