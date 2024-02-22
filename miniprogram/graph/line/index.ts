import Line from "./line"

// graph/line/index.ts
Component({

	/**
	 * 组件的属性列表
	 */
	properties: {

	},

	/**
	 * 组件的初始数据
	 */
	data: {

	},

	/**
	 * 组件的方法列表
	 */
	methods: {

	},
	lifetimes: {
		ready() {
			const line = new Line({
				id: '#myCanvas',
				axis: {
					label: {
						x: ['08:34', '09:34', '10:34', '11:34', '23:34'],
						y: ['0', '5', '10', '15', '20', '25']
					}
				},
				query: this.createSelectorQuery(),
				ready: () => {
					console.log(this)
					console.log(line)
					const data = []
					const now = Date.now()
					for (let i = 0; i < 180; i++) {
						const value = 25 * Math.random()
						const time = now - i * 60 * 1000
						data.unshift({ x: time, y: value })
					}
					line.setData(data)
				}
			})
		}
	}
})