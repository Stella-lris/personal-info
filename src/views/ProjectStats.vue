<script setup>
import { storeToRefs } from "pinia";
import { useProjectStore } from "../stores/projectStore";

const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);
</script>
<template>
  <div class="stats-card">
    <el-statistic title="项目总数" :value="projects.length" suffix="个" />
    <ul>
      <li v-for="p in projects" :key="p.name">{{ p.name }}</li>
    </ul>
  </div>
</template>
<style scoped>
.stats-card {
  padding: 16px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 14px;
}

.stats-card ul {
  margin: 8px 0 0;
  padding-left: 20px;
  color: #666;
}

.stats-card .el-statistic {
  display: block;
  margin-bottom: 12px;
}
</style>