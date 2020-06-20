Vue.component('my-component-footer', {
  template: `<footer class="footer" v-show='hasLength'>
<!-- 剩余完成数 -->
<span class="todo-count"><strong>{{countLeft}}</strong> item left</span>
<!-- 过滤是否完成任务 -->
<ul class="filters">
<li>
    <router-link to='All'>All</router-link>
</li>
<li>
    <router-link to='Active'>Active</router-link>
</li>
<li>
    <router-link to='Completed'>Completed</router-link>
</li>
</ul>
<!-- 清除已完成 -->
<button class="clear-completed" @click='clearCompleted' v-show='hasDone'>Clear completed</button>
</footer>`,
  props: ['countLeft', 'hasLength', 'hasDone'],
  methods: {
    clearCompleted() {
      this.$emit('clear-completed')
    },
  },
})
