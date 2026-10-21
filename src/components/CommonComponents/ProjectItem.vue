<template>
<div class="project-list">
  <!-- 子组件负责循环：一个项目一个框…… -->
  <div class="project-item" v-for="(project,index) in projects" :key="project.name">
    <slot :project="project" :index="index"/> <!-- 作用域插槽：把当前项目对象和序号交给父组件模板 -->
  </div>
</div>
</template>
<script setup>
defineProps({
  projects:{
    type:Array,
    default: () => [],
  }
})
</script>
<style scoped>
.project-list {
  display: flex;
  flex-wrap: wrap;        /* 一行放不下就换行（默认 nowrap 永不换） */
  gap: 16px;
}

.project-item {
  flex: 1 1 220px;        /* 保底 220px：装不下就换行，装得下同行平分 */
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 14px;
  padding: 16px;
  text-align: center;
  color: #aaa;
  background: rgba(255, 255, 255, 0.55);
  transition: box-shadow 0.2s, transform 0.2s;
}
</style>