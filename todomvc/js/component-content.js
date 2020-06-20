Vue.component('my-component-content', {
  template: `<section class="main">
<input id="toggle-all" class="toggle-all" type="checkbox" @change='editChecked' :checked='isChecked'/>
<label for="toggle-all">Mark all as complete</label>
<ul class="todo-list">
<li :class="{completed:item.done,editing:editId===item.id}" v-for='item in list'>
    <div class="view">
    <input class="toggle" type="checkbox" :checked='item.done' @change='editDone(item.id,$event)' />
    <label @dblclick='showEdit(item.id)'>{{item.name}}</label>
    <button class="destroy" @click='delTodo(item.id)'></button>
    </div>
    <input class="edit" @keyup.enter.trim='editTodo(item.id,$event)' :value="item.name" v-focus/>
</li>
</ul>
</section>`,
  props: ['list', 'isChecked'],
  methods: {
    showEdit(id) {
      this.editId = id
    },
    //父传子
    editTodo(id, e) {
      //将id和name传递给父
      this.$emit('edit-todo', id, e.target.value)
      //隐藏编辑框
      this.editId = -1
    },
    //删除某一项
    delTodo(id) {
      this.$emit('del-todo', id)
    },
    //编辑某一项
    editDone(id, e) {
      this.$emit('edit-done', id, e.target.checked)
    },
    //改变选中状态
    editChecked() {
      this.$emit('edit-checked')
    },
  },
  data() {
    return {
      editId: -1,
    }
  },
  directives: {
    focus: {
      update: (el) => {
        el.focus()
      },
    },
  },
})
