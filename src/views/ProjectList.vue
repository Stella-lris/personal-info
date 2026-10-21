<script setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useProjectStore } from "../stores/projectStore";

const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);   // 解构出来是 ref

const keyword = ref("");              // 搜索关键字
const sortType = ref("date-desc");    // 排序：date-desc / date-asc / defaul

const displayedProjects = computed(() => {
  // ① 先把原始下标焊进数据（filter/sort 之后就找不回来了）
  let list = projects.value.map((project, index) => ({project, index}));

  // ② 搜索：名称或简介包含关键字（不区分大小写）
  const kw = keyword.value.trim().toLowerCase();
  if (kw) {
    list = list.filter(
        ({project}) =>
            project.name.toLowerCase().includes(kw) ||
            project.desc.toLowerCase().includes(kw)
    );
  }
  if (sortType.value === "date-desc") {
    list = list.sort((a, b) => b.project.date.localeCompare(a.project.date));
  } else if (sortType.value === "date-asc") {
    list = list.sort((a, b) => a.project.date.localeCompare(b.project.date));
  }
// default：什么都不做，保持原始顺序
  return list;
});
</script>
<template>
  <RouterLink class="to-stats" :to="{ name: 'project-stats' }">查看统计</RouterLink>
  <div class="list-tools">
    <el-input
        v-model="keyword"
        class="search-input"
        placeholder="搜索项目名称或简介"
        clearable
    />
    <el-select v-model="sortType" class="sort-select">
      <el-option label="日期降序" value="date-desc" />
      <el-option label="日期升序" value="date-asc" />
      <el-option label="默认顺序" value="default" />
    </el-select>
  </div>
  <el-empty
      v-if="displayedProjects.length === 0"
      description="没有匹配的项目"
      :image-size="80"
  />

  <el-row v-else :gutter="16">
    <el-col
        v-for="{project, index} in displayedProjects"
        :key="index"
        :span="8"
    >
      <RouterLink
          class="project-card"
          :to="{ name: 'project-detail', params: { id: index } }"
      >
        <el-card shadow="hover">
          <img :src="project.img" :alt="project.name" />
          <p class="name">{{ project.name }}</p>
          <p class="date">{{ project.date || "暂无日期" }}</p>
          <p class="desc">{{ project.desc }}</p>
        </el-card>
      </RouterLink>
    </el-col>
  </el-row>
</template>
<style scoped>
.project-card {
  display: block;
  width: 100%;            /* ← 改：原来是固定 180px，现在交给 col 控制宽度 */
  margin-bottom: 16px;    /* ← 补：列间距（上下） */
  padding: 14px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  color: #444;
  transition: transform 0.2s, box-shadow 0.2s;
}

.project-card {
  display: block;
  width: 100%;
  margin-bottom: 16px;
  text-decoration: none;
  color: #444;
}

.project-card img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
}

.project-card .name {
  margin: 8px 0 4px;
  font-weight: bold;
}

.project-card .desc {
  margin: 0;
  font-size: 13px;
  color: #888;
}
.list-tools {
  display: flex;
  gap: 10px;
  margin: 12px 0 16px;
}

.search-input {
  max-width: 240px;
}

.sort-select {
  width: 160px;
}

.project-card .date {
  margin: 2px 0 6px;
  font-size: 12px;
  color: #999;
}
</style>