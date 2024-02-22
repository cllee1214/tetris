
const getBoundingClientRect = (id: string) => {
	return new Promise<WechatMiniprogram.BoundingClientRectCallbackResult>((resolve, reject) => {
		wx.createSelectorQuery().select(id).boundingClientRect(res => {
			resolve(res)
		}).exec()
	})
}

function throttle<F extends (...arg: any[]) => any>(func: F, delay: number = 1000) {
	let previous = Date.now();
	return function(args: Parameters<F>) {
			// var context = this;
		
			var now = Date.now()
			console.log(now, previous)
			if (now - previous >= delay) {  // 如果本次触发和上次触发的时间间隔超过设定的时间
					// func.call(context, args);  // 就执行事件处理函数 （eventHandler）
					func(args)
					previous = now;  // 然后将本次的触发时间，作为下次触发事件的参考时间。
			}
	}
}

export {
	getBoundingClientRect,
	throttle
}
