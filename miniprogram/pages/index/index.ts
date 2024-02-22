import { S, ShapeCollection } from './shape'
type Status = 0 | 1 | 2
interface Item {
	x: number,
	y: number,
	key: string,
	status: Status,
	bg: 'red' | '#fff' | 'gray'
}

Page({
	data: {
		row: 20,
		col: 10,
		blocks: [] as Item[][]
	},
	currentShape: null as ShapeCollection | null,
	initPage() {
		const items: Item[][] = []
		for (let i = 0; i < this.data.row; i++) {
			const row: Item[] = []
			for (let j = 0; j < this.data.col; j++) {
				row.push({ x: i, y: j, status: 0, key: i + '-' + j, bg: '#fff' })
			}
			items.push(row)
		}
		this.setData({ blocks: items })
		console.log(items)
	},
	renderShape(shape: S) {
		const currentForm = shape.currentForm
		const active = shape.active
		// const active = true
		const blocks = this.data.blocks
		this.currentShape = shape
		blocks.forEach((row, y) => {
			row.forEach((block, x) => {
				currentForm.forEach(form => {
					if (form[0] === x && form[1] === y) {
						block.status = active ? 1 : 2
						block.bg = active ? 'red' : 'gray'
					}
				})
			})
		})
		this.setData({ blocks })
	},
	handleLeft() {
		if (this.currentShape) {
			const canMove = this.currentShape.checkLeft()
			if (!canMove) return
			this.clearMoveingBlocks()
			this.currentShape.move('left')
			this.renderShape(this.currentShape)
		}
	},
	handleRight() {
		if (this.currentShape) {
			const canMove = this.currentShape.checkRight()
			if (!canMove) return
			this.clearMoveingBlocks()
			this.currentShape.move('right')
			this.renderShape(this.currentShape)
		}
	},
	handleDown() {
		if (this.currentShape) {
			if (!this.currentShape.active) return
			const active = this.currentShape.checkDown()
			this.clearMoveingBlocks()
			this.currentShape.move('down')
			this.renderShape(this.currentShape)
		}
	},
	clearMoveingBlocks() {
		const blocks = this.data.blocks
		blocks.forEach((row, y) => {
			row.forEach((block, x) => {
				if (block.status === 1) {
					block.status = 0
					block.bg = '#fff'
				}
			})
		})
		this.setData({ blocks })
	},
	handleTransform() {
		this.clearMoveingBlocks()
		if (this.currentShape) {
			this.currentShape?.transform()
			this.renderShape(this.currentShape)
		}
	},
	onReady() {

	},
	onLoad() {
		this.initPage()
		const s = new S({ x: 3, y: 5 }, { width: 10, height: 20 })
		s.init()
		console.log(s)
		this.renderShape(s)
	},
})
