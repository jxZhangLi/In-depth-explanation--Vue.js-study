vm.$watch('a.b.c', function (newVal, oldVal) {
	//做点什么
})

//vm.$watch返回一个取消观察函数，用来停止触发回调
var unwatch = vm.$watch('a', (newVal, oldVal) => {})
//之后取消观察
unwatch()

