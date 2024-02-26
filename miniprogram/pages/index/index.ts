import { S, ShapeCollection, Block } from './shape'

Page({
	data: {
		row: 20,
		col: 10,
		blocks: [] as Block[][]
	},
	currentShape: null as ShapeCollection | null,
	fixBlocks: [] as number[][],
	renderFixedBlock(deActiveShape: ShapeCollection) {

		const points = deActiveShape.currentForm
		const map: Record<string, boolean> = {}
		points.forEach(point => {
			map[point[1] + '-' + point[0]] = true
		})
		console.log(map)
		const blocks = this.data.blocks
		const newBlocks = blocks.map(row => {
			return row.map(block => {
				if (map[block.key]) {
					return { ...block, status: 2, bg: 'gray' }
				}
				return block
			})
		})
		this.setData({ blocks: newBlocks as Block[][] })
	},
	cacheFixedBlock(deActiveShape: ShapeCollection) {
		const points = deActiveShape.currentForm
		points.forEach(point => {
			this.fixBlocks.push([point[0], point[1]])
		})
	},
	initPage() {
		const items: Block[][] = []
		for (let i = 0; i < this.data.row; i++) {
			const row: Block[] = []
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
	checkTouchBottom() {
		const height = this.data.row
		const currentShape = this.currentShape as S
		return currentShape.currentForm.some(point => {
			return point[1] === height - 1
		})
	},
	checkCollision() {
		const currentShape = this.currentShape as S
		const fixPointsMap: Record<string, boolean> = {}
		this.fixBlocks.forEach(block => {
			fixPointsMap[block[0] + '-' + block[1]] = true
		})
		console.log(fixPointsMap)
		let willCollision = false
		const form = currentShape.getNextDownFrom()

		for (let i = 0; i < form.length; i++) {
			const point = form[i]
			const key = point[0] + '-' + point[1]
			if (fixPointsMap[key]) {
				willCollision = true
				break
			}
		}
		return willCollision
	},
	handleDown() {
		if (this.currentShape && this.currentShape.active) {
			const touchBottom = this.checkTouchBottom()
			if (touchBottom) {
				this.currentShape.active = false
				console.log('到底了')
				console.log(this.currentShape.currentForm)
				this.cacheFixedBlock(this.currentShape)
				this.renderFixedBlock(this.currentShape)
				return
			}
			const willCollision = this.checkCollision()
			if (willCollision) {
				this.currentShape.active = false
				console.log('马上碰撞了')
				this.cacheFixedBlock(this.currentShape)
				this.renderFixedBlock(this.currentShape)
				return
			}
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
		if (this.currentShape) {
			const canTransform = this.currentShape.checkTransform()
			console.log(canTransform)
			if (!canTransform) return
			this.clearMoveingBlocks()
			this.currentShape?.transform()
			this.renderShape(this.currentShape)
		}
	},
	start() {
		setInterval(() => {
			this.handleDown()
		}, 1000)
	},
	makeRandomShape() {
		const s = new S({ x: 3, y: 5 }, { width: 10, height: 20 })
		s.init()
		return s
	},
	handlCreate() {
		const s = this.makeRandomShape()
		console.log(s)
		this.renderShape(s)
	},
	onReady() {

	},
	onLoad() {
		this.initPage()
		const s = this.makeRandomShape()
		console.log(s)
		this.renderShape(s)
		// this.start()
	},
})
