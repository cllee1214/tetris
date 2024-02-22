import Graph, { Config, Point } from "../graph";

type LinePoint = {
	y: number | string,
	x: number | string,
}

interface RenderPoint {
	x: number,
	y: number,
	color: string,
	r: number
}


class Line extends Graph {
	points: RenderPoint[] = []
	constructor(config: Config) {
		super(config)
		this.initCanvas().then(() => {
			this.readyCb()
			this.drawAxis()
			this.drawTicks('x')
			this.drawTicks('y')
		})
	}
	private drawAxis() {
		const { padding, ctx } = this
		const canvasHeight = this.canvas.height / this.dpr
		const canvasWidth = this.canvas.width / this.dpr
		const start: Point = [padding, padding]
		const mid: Point = [padding, canvasHeight - padding]
		const end: Point = [canvasWidth - padding, canvasHeight - padding]
		console.log(start, mid)
		this.drawLine(start, mid)
		this.drawLine(mid, end)
	}
	private drawTicks(type: 'x' | 'y') {
		const ctx = this.ctx
		const items = type === 'x' ? this.axis.label.x : this.axis.label.y
		const canvasHeight = this.canvas.height / this.dpr
		const canvasWidth = this.canvas.width / this.dpr
		const axisWidth = canvasWidth - 2 * this.padding
		const axisHeight = canvasHeight - 2 * this.padding

		ctx.fillStyle = '#222'
		for (let i = 0; i < items.length; i++) {
			const text = items[i]
			// console.log(metrics)
			if (type === 'x') {
				const space = axisWidth / items.length
				const y = canvasHeight - this.padding
				const x = i * space + this.padding
				this.drawLine([x, y], [x, y + 3])
				ctx.font = 'bold 10px'
				const metrics = ctx.measureText(text);
				const textWidth = metrics.width
				ctx.fillText(text, (x - textWidth / 2), y + 3 + metrics.fontBoundingBoxAscent)
			} else {
				const space = axisHeight / items.length
				ctx.font = '10px'
				const metrics = ctx.measureText(text);
				const textWidth = metrics.width
				const x = this.padding - textWidth - 5
				const y = canvasHeight - this.padding - space * i
				ctx.fillText(text, x, y)
			}
		}
	}
	private drawPoints(points: RenderPoint[]) {
		const ctx = this.ctx
		for (let i = 0; i < points.length; i++) {
			ctx.beginPath()
			const { x, y, r, color } = points[i]
			ctx.arc(x, y, r, 0, Math.PI * 2)
			ctx.fillStyle = color
			ctx.fill()
			ctx.closePath()
			ctx.stroke()
		}
	}
	private makeRenderPoints(data: LinePoint[]) {
		const len = data.length
		const spaceX = (this.canvasSize.width - this.padding * 2) / len
		const spaceY = (this.canvasSize.height - this.padding * 2) / 25
		const result: RenderPoint[] = data.map((item, i) => {
			return {
				x: this.padding + i * spaceX,
				y: spaceY * (item.y as number) + this.padding,
				r: 2,
				color: 'red'
			}
		})
		return result
	}
	setData(data: LinePoint[]) {
		console.log(data)
		const points = this.makeRenderPoints(data)
		this.points = points
		this.drawPoints(points)
	}
	changeFingerPosition(x: number) {

	}
}

export default Line