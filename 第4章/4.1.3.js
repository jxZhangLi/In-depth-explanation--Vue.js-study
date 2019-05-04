export default class Watcher {
	constructor (vm, expOrFn, cb, options) {
		this.vm = vm

		//新增
		if (options) {
			this.deep = !!options.deep
		} else {
			this.deep = false
		}

		this.deps = []
		this.depIds = new Set()
		this.getter = parsePath(expOrFn)
		this.cb = cb
		this.value = this.get()
	}

	get() {
		window.target = this
		let value = this.getter.call(vm, vm)

		//新增
		if (this.deep) {
			traversr(value)
		}
		window.target = undefined
		return value
	}
}