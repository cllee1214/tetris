import Game from "../game"

type Status = 0 | 1 | 2
export interface Block {
	x: number,
	y: number,
	key: string,
	status: Status,
	bg: 'red' | '#fff' | 'gray'
}

export interface OriginPoint {
	x: number
	y: number
}
export interface Zone {
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
	active = true
	constructor(origin: OriginPoint, zone: Zone) {
		this.origin.x = origin.x
		this.origin.y = origin.y
		this.zone.height = zone.height
		this.zone.width = zone.width
	}
	abstract makeForms(origin: OriginPoint): number[][][]
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
	check(forms: number[][], fixedBlocksMap: Game['fixedBlocksMap']) {
		return forms.every(item => {
			const key = item[1] + '-' + item[0]
			return (item[0] >= 0 && item[0] <= this.zone.width - 1) && (item[1] <= this.zone.height - 1) && (!fixedBlocksMap.get(key))
		})
	}
	checkTransform(fixedBlocksMap: Game['fixedBlocksMap']) {
		const index = (this.formIndex + 1) > this.forms.length - 1 ? 0 : this.formIndex + 1
		const currentForm = this.forms[index]
		return this.check(currentForm, fixedBlocksMap)
	}
	transform() {
		const index = (this.formIndex + 1) > this.forms.length - 1 ? 0 : this.formIndex + 1
		this.formIndex = index
		console.log(index)
		this.currentForm = this.forms[index]
	}
	checkMove(direction: Direction, fixedBlocksMap: Game['fixedBlocksMap']) {
		const origin = {
			x: this.origin.x,
			y: this.origin.y,
		} as OriginPoint
		switch (direction) {
			case 'left':
				origin.x--
				break;
			case 'right':
				origin.x++
				break;
			case 'down':
				origin.y++
				break;
			default:
				break;
		}
		const forms = this.makeForms(origin)
		const next = forms[this.formIndex]
		return this.check(next, fixedBlocksMap)
		// return next.every(item => {
		// 	const key = item[1] + '-' + item[0]
		// 	return (item[0] >= 0 && item[0] <= this.zone.width - 1) && (item[1] <= this.zone.height - 1) && (!fixedBlocksMap.get(key))
		// })
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
		// 根据新的原点生成形状
		this.forms = this.makeForms(this.origin)
		this.currentForm = this.forms[this.formIndex]
	}
	init() {
		// const index = Math.floor(this.forms.length * Math.random())
		const index = this.formIndex
		this.currentForm = this.forms[index]
	}
}

export {
	Shape,
	Status
}