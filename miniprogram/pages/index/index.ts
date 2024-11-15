import { Block } from './shapes/shape'
import { S, ShapeCollection } from './shapes/index'
import Game from './game'

Page({
	data: {
		// row: 20,
		// col: 10,
		blocks: [] as Block[][]  // ?
	},
	gameObject: null as Game | null,
	handleLeft() {
		this.gameObject?.moveLeft()
	},
	handleRight() {
		this.gameObject?.moveRight()
	},
	handleDown() {
		this.gameObject?.moveDown()
	},

	handleTransform() {
		this.gameObject?.tranasform()
	},
	// start() {
	// 	setInterval(() => {
	// 		this.handleDown()
	// 	}, 1000)
	// },
	handleFastDown() {
		if(this.gameObject && this.gameObject.currentShape) {
			while(this.gameObject.currentShape.active) {
				this.gameObject.moveDown()
			}
		}
	},
	handlCreate() {
		if (this.gameObject) {
			const s = this.gameObject.makeRandomShape()
			this.gameObject.renderShape(s)
		}
	},
	onReady() {

	},
	onLoad() {
		const game = this.gameObject = new Game()
		game.init({
			row: 20,
			col: 10
		}, this)
		const s = game.makeRandomShape()
		console.log(s)
		game.renderShape(s)
		// this.renderShape(s)
		// this.start()
	},
})
