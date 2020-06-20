//创建一个全局组件
Vue.component('my-component-header', {
  template: `<header class="header">
                <h1>todos</h1>
                <input class="new-todo" @keyup.enter.trim='addTodo' v-model='todoName' placeholder="What needs to be done?" v-focus />
            </header>`,
  //在组件中  组件我们希望是可复用的,而数据不希望它是可复用的,若是返回一个对象 存储的是同一个地址,在其它使用了该组件的某个地方改变了这个对象的值的话 那么其它使用到该组件的地方也会同样被修改了
  data() {
    return {
      //定义一个变量与输入框进行绑定
      todoName: '',
    }
  },
  methods: {
    //现在使用的数据是父中的数据,如果要进行修改的话也应该是由父中进行修改
    //子传父  步骤1 父中定义一个方法  2在父使用子组件中定义一个自定义事件 3子组件触发该事件传数据
    addTodo() {
      if (this.todoName == '') return
      this.$emit('add-todo', this.todoName)
      //清空输入框
      this.todoName = ''
    },
  },
  directives: {
    focus: {
      inserted: (el) => {
        el.focus()
      },
    },
  },
})
