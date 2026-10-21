<script setup>
import { computed,onMounted, ref } from "vue";
import ProfileCard from "../components/ProfileComponents/ProfileCard.vue";
import SectionCard from "../components/CommonComponents/SectionCard.vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "../stores/profileStore";
import { useProjectStore } from "../stores/projectStore";

const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);
const profileStore = useProfileStore();
const { info: information } = storeToRefs(profileStore);

const colorSchemes = [
  {pageBg: "#ffffff", cardBg: "#f7f7f7" },
  { pageBg: "#ffd9e4", cardBg: "#ffffff" },
  { pageBg: "#d3e3f0", cardBg: "#ffffff" },
];

const currentColorIndex = ref(0);

const featuredProjects = computed(() =>
    projects.value
        .map((project, index) => ({ project, index }))
        .slice(0, 3)
);

function toggleColors() {
  currentColorIndex.value =
    (currentColorIndex.value + 1) % colorSchemes.length;
  document.body.style.backgroundColor =
    colorSchemes[currentColorIndex.value].pageBg;
}

onMounted(() => {
  document.body.style.backgroundColor =
    colorSchemes[currentColorIndex.value].pageBg;
});

</script>

<template>
  <div>
    <!-- ① 基本信息区块 -->
    <section id="section-info" class="section-block">
      <ProfileCard
          :card-bg="colorSchemes[currentColorIndex].cardBg"
          :show-edit="false"
          @toggle-colors="toggleColors"
      />
    </section>

    <section id="section-education" class="section-block">
      <SectionCard :card-bg="colorSchemes[currentColorIndex].cardBg">
        <template #title>
          <p class="section-title">教育背景</p>
        </template>
        <el-descriptions :column="1" border>
          <el-descriptions-item label="学校">
            {{ information.education.school }}
          </el-descriptions-item>
          <el-descriptions-item label="专业">
            {{ information.education.major }}
          </el-descriptions-item>
          <el-descriptions-item label="学历">
            {{ information.education.degree }}
          </el-descriptions-item>
          <el-descriptions-item label="起止时间">
            {{ information.education.start }} — {{ information.education.end }}
          </el-descriptions-item>
          <el-descriptions-item label="主修课程">
            {{ information.education.courses }}
          </el-descriptions-item>
        </el-descriptions>
      </SectionCard>
    </section>

    <section id="section-tech" class="section-block">
      <SectionCard :card-bg="colorSchemes[currentColorIndex].cardBg">
        <template #title>
          <p class="section-title">技术栈</p>
        </template>
        <el-empty
            v-if="information.techStack.length === 0"
            description="还没有添加技术栈，去后台补上"
            :image-size="60"
        />
        <div v-else class="tech-list">
          <el-tag
              v-for="tech in information.techStack"
              :key="tech"
          >{{ tech }}</el-tag>
        </div>
      </SectionCard>
    </section>
    <section id="section-projects" class="section-block">
      <SectionCard :card-bg="colorSchemes[currentColorIndex].cardBg">
        <template #title>
          <p class="section-title">项目经历</p>
        </template>
        <el-empty
            v-if="featuredProjects.length === 0"
            description="还没有项目，去后台添加"
            :image-size="60"
        />
        <div v-else class="featured-list">
          <RouterLink
              v-for="{ project, index } in featuredProjects"
              :key="index"
              class="featured-item"
              :to="{ name: 'project-detail', params: { id: index } }"
          >
            <img
                :src="project.img || 'https://dummyimage.com/160x100/cccccc/666666&text=No+Image'"
                :alt="project.name"
            />
            <h4>{{ project.name }}</h4>
            <p>{{ project.desc }}</p>
          </RouterLink>
        </div>
        <p class="more-link">
          <RouterLink :to="{ name: 'project-list' }">查看全部项目 →</RouterLink>
        </p>
      </SectionCard>
    </section>

  </div>
</template>
<style scoped>
.section-block {
  scroll-margin-top: 80px;
}
.section-title {
  margin: 0;
  font-weight: bold;
  color: #444;
}
.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.featured-list {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.featured-item {
  flex: 1;
  min-width: 150px;
  display: block;
  text-decoration: none;
  color: #444;
}

.featured-item img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.featured-item h4 {
  margin: 8px 0 4px;
  font-size: 14px;
}

.featured-item p {
  margin: 0;
  font-size: 12px;
  color: #888;
}

.more-link {
  margin-top: 12px;
  text-align: right;
}

.more-link a {
  color: #4d7868;
  text-decoration: none;
}
</style>