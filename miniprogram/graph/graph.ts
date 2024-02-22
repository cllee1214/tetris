
type ReadyCb = () => void
export type Point = [number, number]
export interface Config {
	id: string,
	padding?: number,
	query: WechatMiniprogram.SelectorQuery
	ready: ReadyCb,
	axis: {
		color?: string,
		label: {
			x: Array<string | number>,
			y: Array<string | number>,
		}
	}
}

class Graph {
	canvasId: string = ''
	query: WechatMiniprogram.SelectorQuery | null = null
	ctx: any = null
	canvas: any = null
	canvasSize = {width: 0, height: 0}
	dpr = 1
	padding = 20
	axis: Config['axis'] = {
		color: '#ccc',
		label: {
			x: [],
			y: []
		}
	}
	readyCb: Config['ready'] = () => { }
	constructor(config: Config) {
		this.initConfig(config)
	}
	protected initConfig(config: Config) {
		this.canvasId = config.id
		this.query = config.query
		this.padding = config.padding || this.padding
		this.axis = config.axis
		this.readyCb = config.ready
	}
	protected initCanvas() {
		return new Promise((resolve, reject) => {
			this.query?.select('#myCanvas')
				.fields({ node: true, size: true })
				.exec((res) => {
					const canvas = this.canvas = res[0].node
					const ctx = this.ctx = canvas.getContext('2d')
					const dpr = this.dpr = wx.getSystemInfoSync().pixelRatio
					console.log('当前dpr:', dpr)
					this.canvasSize.width = res[0].width
					this.canvasSize.height = res[0].height
					canvas.width = res[0].width * dpr
					canvas.height = res[0].height * dpr
					console.log(canvas.width)
					ctx.scale(dpr, dpr)
					return resolve(true)
				})
		})
	}
	drawLine(start: Point, end: Point) {
		const ctx = this.ctx
		ctx.beginPath()
		ctx.moveTo(...start)
		ctx.lineTo(...end)
		ctx.stroke()
		ctx.closePath()
	}
}


export default Graph