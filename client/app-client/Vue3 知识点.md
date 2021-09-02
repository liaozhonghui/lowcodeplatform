### **安装**
```
// 安装命令行工具 (CLI)
npm install -g @vue/cli

// 使用 Vite 快速构建项目
npm init @vitejs/app <project-name>
```

### **新特性**

* diff方法优化：vue2中的虚拟dom是全量的对比，vue3新增了静态标记（patchflag）与上次虚拟节点对比时，只对比带有patch flag的节点（动态数据所在的节点），性能比Vue2.x快1.2~2倍
* 按需编译
* 组合API
* 更好的Ts支持
* 暴露了自定义渲染API(jsx)
* 模板可以有多个根元素

### **定义变量**
简单数据类型使用ref定义,只有ref创建的数据才能被监听
```
const count = ref(1)
```

复杂数据（对象、数组）等使用reactive定义
```
const user = reactive({
    name: 'zhangsan',
    age: 18,
})
```

### **setup注意点**
* setup生命周期：beforeCreate之后，created之前
* setup不能使用this，所以无法使用data和methods
* setup函数只能是同步的，不能是异步的

### **vue2 和 vue3 的数据监听实现方式发生变化**

> * vue2使用Object.defineProperty进行属性监听，vue3使用proxy进行属性监听
> * vue2存在一定的缺陷，它只能监听已存在的属性，对于新增删除属性就无能为力了，同时无法监听数组的变化，所以对于新增属性必须通过$set来手动实现
> * Object.defineProperty只能劫持对象的属性，而 Proxy 是直接代理对象；由于 Object.defineProperty 只能对属性进行劫持，需要遍历对象的每个属性，而 Proxy 不需要遍历操作

### **Object.defineProperty 和 proxy的用法**
```
let obj={
    _a: 1,
	a:1,
	b:2
}
let val=1
Object.defineProperty(obj,'a',{
	get(){
		console.log('数据被获取')
		return this._a
	},
	set(newVal){
		console.log('数据被修改/设置')
		this._a = newVal
	}
})
```

```
let obj={
	a:1,
	b:2
}
let data = new Proxy(obj, {
	get: function(target, property,receiver) {
		console.log('劫持到get操作')
  		return Reflect.get(target, property, receiver)
	},
	set:function(target,property,value,receiver){
		console.log('劫持到set操作');
		return Reflect.set(target, key, value, receiver);
	},
})
```

### **动态组件**
`<component :is="currentTabComponent"></component>`

```
// 缓存保留
<keep-alive>
    <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

currentTabComponent 为组件名称

### **组件之间数据交互方式**
> 父 -> 子：子组件接受父组件数据使用props对象
> 子 -> 父：子组件给父组件传递数据使用$emit事件

### **Provide / Inject**
```
// 父组件
setup() {
    provide('location', 'North Pole')
    provide('geolocation', {
      longitude: 90,
      latitude: 135
    })
}

// 子组件
setup() {
    // inject 第一个参数属性名，第二个默认值
    const userLocation = inject('location', 'The Universe')
    const userGeolocation = inject('geolocation')
    return {
      userLocation,
      userGeolocation
    }
}
```
> provide/inject 绑定并不是响应式的，我们可以通过传递一个 ref property 或 reactive 对象给 provide 来改变这种行为

### **Mixin**
```
// define a mixin object
const myMixin = {
  data() {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}
// define an app that uses this mixin
const app = Vue.createApp({
  mixins: [myMixin],
  data() {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created() {
    console.log(this.$data) // => { message: "goodbye", foo: "abc", bar: "def" }
  }
})
```

> 在 Vue 2 中，mixin 是将部分组件逻辑抽象成可重用块的主要工具。但是，他们有几个问题：

> * mixin 很容易发生冲突：因为每个特性的属性都被合并到同一个组件中，所以为了避免 property 名冲突和调试，你仍然需要了解其他每个特性。
> * 可重用性是有限的：我们不能向 mixin 传递任何参数来改变它的逻辑，这降低了它们在抽象逻辑方面的灵活性。
> * 为了解决这些问题，添加了一种通过逻辑关注点组织代码的新方法：组合式 API。

### **Teleport**
> Teleport 提供了一种干净的方法，允许我们控制在 DOM 中哪个父节点下渲染了 HTML，而不必求助于全局状态或将其拆分为两个组件

```
<teleport to="body">
    <div v-if="modalOpen" class="modal">
        <div>
          My parent is "body"
          <button @click="modalOpen = false">Close</button>
        </div>
    </div>
</teleport>
```