<template>
  <section class="page-card">
    <h2>关于我</h2>

    <div class="about-section">
      <p class="section-title">兴趣爱好</p>

      <div v-if="filteredSkills.length" class="skill-list">
        <el-tag
            v-for="s in filteredSkills"
            :key="s"
            size="small"
        >{{ s }}</el-tag>
      </div>
      <el-empty
          v-else
          :image-size="60"
          :description="
          information.searchText
            ? '没有匹配的技能'
            : '还没有添加技能，去后台补上'
        "
      />
    </div>

    <!-- 个人经历（F7a 搬来的） -->
    <div class="about-section">
      <p class="section-title">个人经历</p>

      <div
          ref="timelineList"
          :class="['timeline-body', { open: isOpen }]"
      >
        <el-timeline>
          <el-timeline-item
              v-for="(item, index) in experiences"
              :key="index"
              :timestamp="item.time"
              placement="top"
          >
            {{ item.text }}
          </el-timeline-item>
        </el-timeline>
      </div>

      <button v-if="showToggle" class="timeline-toggle" @click="isOpen = !isOpen">
        {{ isOpen ? "收起" : "展开" }}
      </button>
    </div>

    <div class="about-section">
      <p class="section-title">照片墙</p>
      <PhotoWall />
    </div>
    <!-- 最近动态（F10.3） -->
    <div class="about-section">
      <p class="section-title">最近动态</p>
      <MomentList />
    </div>

  </section>

</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useExperienceStore, useProfileStore } from "../stores/profileStore.js";
import SearchBox from "../components/CommonComponents/SearchBox.vue";
import PhotoWall from "../components/CommonComponents/PhotoWall.vue";
import MomentList from "../components/CommonComponents/MomentList.vue";

const timelineList = ref(null);
const isOpen = ref(false);
const showToggle = ref(false);

const experienceStore = useExperienceStore();
const { list: experiences } = storeToRefs(experienceStore);

const profileStore = useProfileStore();
const { info: information } = storeToRefs(profileStore);

// 技能筛选（从 ProfileCard 原样搬来）
const filteredSkills = computed(() => {
  const summary = Array.isArray(information.value.summary)
      ? information.value.summary
      : [];
  if (!information.value.searchText) {
    return summary;
  }
  return summary.filter((skill) =>
      skill.toLowerCase().includes(information.value.searchText.toLowerCase())
  );
});

// 搜索日志（跟着搜索框一起搬）
watch(
    () => information.value.searchText,
    (newVal) => {
      if (newVal === "") {
        console.log("搜素框已经清空，显示全部技能");
      } else {
        console.log("正在搜素:" + newVal);
      }
    }
);

onMounted(() => {
  const el = timelineList.value;
  if (el && el.scrollHeight > window.innerHeight / 2) {
    showToggle.value = true;
  }
});
</script>
<style scoped>
.about-section {
  margin-top: 24px;
}

.section-title {
  margin: 0 0 12px;
  font-weight: bold;
  color: #444;
}

.timeline-body {
  max-height: 50vh;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.timeline-body.open {
  max-height: none;
}

.timeline-toggle {
  margin-top: 12px;
}

.search-row {
  margin: 12px 0;
}

.search-row input {
  max-width: 160px;
}

.search-result {
  margin: 0 0 8px;
  color: #666;
  font-size: 13px;
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>