<template>
  <header class="site-header">
    <div class="site-header-inner">
      <div class="site-title-area">
        <span class="site-logo"></span>
        <h1 class="site-title">{{ title }}</h1>
      </div>
      <div class="site-header-end">
        <nav v-if="route.name === 'home'" class="header-nav">
          <button @click="scrollToSection('section-info')">基本信息</button>
          <button @click="scrollToSection('section-education')">教育背景</button>
          <button @click="scrollToSection('section-projects')">项目经历</button>
        </nav>
        <span class="site-badge">今天做作业了吗？</span>
      </div>
    </div>
  </header>
</template>
<script setup>
import { useRoute } from "vue-router";

defineProps({
  title: { type: String, default: "个人主页" },
});

const route = useRoute();

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
</script>
<style scoped>
.site-header {
  position: sticky;   /* ← 新增：粘性定位 */
  top: 0;             /* ← 新增：滚到距顶部 0 就停住 */
  width: 100%;
  margin: -20px -20px 24px;
  padding: 14px 20px;
  border-radius: 0 0 20px;
  background: rgba(255, 255, 255, 0.55);
  border-bottom: 1px solid rgba(255, 255, 255, 0.75);
  box-shadow: 0 1px 14px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.site-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 900px;
  margin: 0 auto;
  gap: 10px;
}

.site-title-area {
  display: flex;
  align-items: center;
  gap: 10px;
}

.site-logo {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: linear-gradient(135deg, #6f9e8d, #4d7868);
  box-shadow: 0 4px 12px rgba(111, 158, 141, 0.35);
}

.site-title {
  margin: 0;
  font-size: 26px;
  color: #2c3e50;
  letter-spacing: 0.5px;
}

.site-badge {
  background: linear-gradient(
    135deg,
    rgba(111, 158, 141, 0.16),
    rgba(111, 158, 141, 0.08)
  );
  color: #4d7868;
  font-size: 13px;
  font-weight: 500;
  padding: 5px 14px;
  border-radius: 999px;
  box-shadow: 0 2px 6px rgba(111, 158, 141, 0.15);
}
.site-header-end {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-nav {
  display: flex;
  gap: 8px;
}

.header-nav button {
  padding: 6px 14px;
  font-size: 13px;
}
</style>