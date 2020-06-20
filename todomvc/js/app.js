;(function (window) {
  'use strict'
  //创建路由实例
  const router = new VueRouter({
    //设置重定向  默认一开始页面显示在All状态下
    routes: [{ path: '/', redirect: '/All' }],
    //设置高亮(有预先写好的类名selected)
    linkExactActiveClass: 'selected',
  })
  //创建vue实例
  const vm = new Vue({
    //挂载路由
    router,
    el: '#app',
    data: {
      /* list数据 父传子 3个步骤  
        1 在父中定义一个自定义属性挂上数据
        2 在子组件中使用props:['自定义属性名']接收
        3 使用  可以用{{}}或者this.自定义属性名
      */
      list: [
        { id: 1, name: '吃饭', done: true },
        { id: 2, name: '睡觉', done: false },
        { id: 3, name: '游戏', done: false },
      ],
    },
    methods: {
      addTodo(name) {
        this.list.unshift({ id: Date.now(), name, done: false })
      },
      editTodo(id, name) {
        //写法1:使用find找到id所在的obj
        this.list.find((obj) => obj.id === id).name = name
        //写法2:使用filter过滤出只有当前id的新数组
        // this.list.filter((obj) => obj.id === id)[0].name = name
      },
      delTodo(id) {
        //删除某一项,过滤出id不是当前id的其他项
        this.list = this.list.filter((obj) => obj.id !== id)
      },
      editDone(id, done) {
        //使用find找到当前项修改done
        this.list.find((obj) => obj.id === id).done = done
      },
      editChecked() {
        //遍历所有的项 把done取反
        this.list.forEach((obj) => (obj.done = !obj.done))
      },
      clearCompleted() {
        this.list = this.list.filter((obj) => !obj.done)
      },
    },
    computed: {
      //计算剩余项--->done为false的
      countLeft() {
        return this.list.filter((obj) => !obj.done).length
      },
      //全选按钮的选中状态
      isChecked() {
        return this.list.every((obj) => obj.done)
      },
      //计算数组的长度
      hasLength() {
        return this.list.length > 0
      },
      //是否有已完成的
      hasDone() {
        return this.list.some((obj) => obj.done)
      },
      //展示的数据
      showList() {
        /* 注意:computed和watch的底层实现的原理是一样的,所以在路由发生变化时它也能够监听到 */
        //获取哈希值$route.path
        let path = this.$route.path
        //判断url的哈希值返回对应的数据
        if (path == '/Active') {
          //根据哈希值的不同过滤出不同的数据给showList传递给子组件
          return this.list.filter((obj) => !obj.done)
        } else if (path == '/Completed') {
          return this.list.filter((obj) => obj.done)
        } else {
          return this.list
        }
      },
    },
  })
})(window)
