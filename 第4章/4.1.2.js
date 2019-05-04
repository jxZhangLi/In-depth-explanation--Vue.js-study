Vue.prototype.$watch = function (expOrFn, cb, options) {
	const vm = this
	options = options || {}
	const watcher = new Watcher(vm, expOrFn, options)
	if (options.immediate) {
		cb.call(vm, watcher.value)
	}
	return function unwatchFn() {
		watcher.teardown()
	}
};


export default class Watcher {
	constructor (vm, expOrFn, cb) {
		this.vm = vm;

		//expOrFn参数至此函数
		if (typeof expOrFn === 'function') {
			this.getter = expOrFn
		} else {
			this.getter = parsePath(expOrFn)
		}
		this.cb = cb;
		this.value = this.get()
	}

	......
};


export default class Watcher {
	constructor (vm, expOrFn, cb) {
		this.vm = vm;
		this.deps = vm;//新增
		this.depIds = new Set();  //新增
		this.getter = parsePath(expOrFn);
		this.cb = cb;
		this.value = this.get()
	}
	......

	addDep (dep) {
		const id = dep.id
		if (!this.depIds.has(id)) {
			this.depIds.add(id);
			this.deps.push(dep);
			dep.addSub(this)
		}
	}

	......
};

this.$watch(function () {
	return this.name + this.age
}, function (newValue, oldValue) {
	console.log(newValue, oldValue);
})



/*
* 从所有依赖项的Dep列表中将自己移除
* */
teardown () {
	let i = this.deps.length
	while (i--) {
		this.deps[i].removeSub(this)
	}
}


export default class Dep {


	removeSub (sub) {
		const index = this.subs.indexOf(sub)
		if (index > -1) {
			return this.subs.splice(index,1)
		}
	}

}
//上面代码把Watcher从sub中删除掉，然后当数据发生变化时，将不再通知这个已经删除的Watcher，这就是unwatch的原理



