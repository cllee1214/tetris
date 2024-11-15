import { I, L, O, S, ShapeCollection } from "./shapes/index"
import { Block } from "./shapes/shape"

interface GameConfig {
	row: number,
	col: number,
}

class Game {
	page = null as WechatMiniprogram.Page.Instance<any, any>
	gameConfig = {} as GameConfig
	blocksMap = new Map<string, Block>()
	blocks: Block[][] = []
	fixedBlocksMap = new Map<string, boolean>()
	currentShape: ShapeCollection | null = null
	score = 0
	init(config: GameConfig, page: WechatMiniprogram.Page.Instance<any, any>) {
		this.gameConfig = config
		this.page = page

		this.initGrid()
	}
	private initGrid() {
		const { row, col } = this.gameConfig
		const items: Block[][] = []
		for (let i = 0; i < row; i++) {
			const row: Block[] = []
			for (let j = 0; j < col; j++) {
				const key = i + '-' + j
				const block = { x: i, y: j, status: 0, key, bg: '#fff' } as Block
				row.push(block)
				this.blocksMap.set(key, block)
			}
			items.push(row)
		}
		if (this.page) {
			this.page.setData({ blocks: items })
			this.blocks = items
			console.log(items)
		}
	}
	checkGame() {

	}
	clearScoreRow(rowIndexs: number[]) {
		if(rowIndexs.length === 0) return
		rowIndexs.forEach(index => {
			const row = this.blocks[index]
			row.forEach(item => {
				item.status = 0
				item.bg = '#fff'
			})

			for (let i = 0; i < this.gameConfig.col; i++) {
				const key = index + '-' + i
				this.fixedBlocksMap.set(key, false)
			}
		})
		this.page.setData({ blocks: this.blocks })
	}
	countScore() {
		const clearRowIndexs = [] as number[]
		this.blocks.forEach((row, index) => {
			const canClear = row.every(item => {
				return item.status === 2
			})
			if (canClear) {
				clearRowIndexs.push(index)
			}
		})
		console.log(clearRowIndexs)
		this.score += clearRowIndexs.length
		this.page.setData({score: this.score})
		this.clearScoreRow(clearRowIndexs)
	}
	makeRandomShape() {
		const constructors = [S, O, I, L]
		// const constructors = [L]
		const index = Math.floor(Math.random() * constructors.length)
		const C = constructors[index]
		const shape = new C({ x: 3, y: 5 }, { width: 10, height: 20 })
		shape.init()
		return shape
	}
	renderShape(shape: ShapeCollection) {
		this.currentShape = shape
		const active = shape.active
		const currentForm = shape.currentForm
		currentForm.forEach(item => {
			const key = item[1] + '-' + item[0]
			const block = this.blocksMap.get(key)
			if (block) {
				block.status = active ? 1 : 2
				block.bg = active ? 'red' : 'gray'
			}
		})
		this.page.setData({ blocks: this.blocks })
	}
	clearMoveingBlocks() {
		const blocks = this.blocks
		blocks.forEach((row, y) => {
			row.forEach((block, x) => {
				if (block.status === 1) {
					block.status = 0
					block.bg = '#fff'
				}
			})
		})
		this.page.setData({ blocks })
	}
	tranasform() {
		if (this.currentShape && this.currentShape.active) {
			const canTransform = this.currentShape.checkTransform(this.fixedBlocksMap)
			console.log(canTransform)
			if (!canTransform) return
			this.clearMoveingBlocks()
			this.currentShape?.transform()
			this.renderShape(this.currentShape)
		}
	}
	moveLeft() {
		if (this.currentShape) {
			const canMove = this.currentShape.checkMove('left', this.fixedBlocksMap)
			if (canMove) {
				this.clearMoveingBlocks()
				this.currentShape.move('left')
				this.renderShape(this.currentShape)
			}
		}
	}
	moveRight() {
		if (this.currentShape) {
			const canMove = this.currentShape.checkMove('right', this.fixedBlocksMap)
			if (canMove) {
				this.clearMoveingBlocks()
				this.currentShape.move('right')
				this.renderShape(this.currentShape)
			}
		}
	}
	renderFix(fixShape: ShapeCollection) {
		fixShape.currentForm.forEach(item => {
			const key = item[1] + '-' + item[0]
			const block = this.blocksMap.get(key)
			if (block) {
				block.bg = 'gray'
				block.status = 2
				this.fixedBlocksMap.set(key, true)
			}
		})
		this.page.setData({ blocks: this.blocks })
	}
	moveDown() {
		const currentShape = this.currentShape
		if (currentShape && currentShape.active) {
			const canMoveDown = currentShape.checkMove('down', this.fixedBlocksMap)
			if (canMoveDown) {
				this.clearMoveingBlocks()
				currentShape.move('down')
				this.renderShape(currentShape)
			} else {
				console.log('不能往下了')

				currentShape.active = false

				this.renderFix(currentShape)
				console.log(this.fixedBlocksMap)
				console.log(this.blocks)
				this.countScore()
			}
		}
	}
}

export default Game