<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useProjectStore } from "../stores/projectStore";

const route = useRoute();
const router = useRouter();
const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);
const id = computed(() => Number(route.params.id));
const currentProject = computed(() => projects.value[id.value]);
// 到头/到尾了就把按钮置灰
const prevDisabled = computed(() => id.value <= 0);
const nextDisabled = computed(() => id.value >= projects.value.length - 1);

if (!currentProject) {
  // 项目不存在：就地换成项目列表，历史里不留这条坏地址
  router.replace({ name: "project-list" });
}
// offset 传 -1 上一个、传 1 下一个
function goProject(offset) {
  router.push({
    name: "project-detail",
    params: { id: id.value + offset },
  });
}
</script>
<template>
  <div v-if="currentProject" class="detail-card">
    <img :src="currentProject.img" :alt="currentProject.name" />
    <h3>{{ currentProject.name }}</h3>
    <p>{{ currentProject.desc }}</p>

    <div class="detail-actions">
      <button @click="router.go(-1)">返回上一页</button>
      <button @click="router.push({ name: 'project-list' })">返回列表</button>
      <p class="detail-count">第 {{ id + 1 }} 个，共 {{ projects.length }} 个</p>
      <div class="pager">
        <button :disabled="prevDisabled" @click="goProject(-1)">上一个</button>
        <button :disabled="nextDisabled" @click="goProject(1)">下一个</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.detail-card {
  padding: 16px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 14px;
}

.detail-card img {
  width: 100%;
  max-height: 220px;
  object-fit: cover;
  border-radius: 10px;
}

.detail-card h3 {
  margin: 12px 0 6px;
  color: #333;
}

.detail-card p {
  margin: 0 0 12px;
  color: #666;
}

.detail-actions {
  display: flex;
  gap: 10px;
}
.detail-count {
  margin: 16px 0 8px;
  color: #999;
  font-size: 13px;
}

.pager {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}
</style>