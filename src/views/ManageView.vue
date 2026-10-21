<template>
  <div class="manage-page">
    <h2>后台管理</h2>
    <nav class="manage-nav">
      <RouterLink :to="{ name: 'manage-profile' }">编辑个人简介</RouterLink>
      <RouterLink :to="{ name: 'manage-experiences' }">编辑个人经历</RouterLink>
      <RouterLink :to="{ name: 'manage-projects' }">编辑项目信息</RouterLink>
      <RouterLink :to="{ name: 'manage-articles' }">编辑文章</RouterLink>
      <RouterLink :to="{ name: 'manage-moments' }">发布动态</RouterLink>
      <RouterLink :to="{ name: 'manage-photos' }">上传照片</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>
<style scoped>
.manage-page {
  max-width: 620px;
  margin: 0 auto;
}

.manage-nav {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.manage-nav a {
  padding: 6px 14px;
  border-radius: 999px;
  text-decoration: none;
  color: #4d7868;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(111, 158, 141, 0.25);
}

.manage-nav a.router-link-active {
  background: #6f9e8d;
  color: #fff;
}
.manage-nav {
  display: flex;
  flex-wrap: wrap;      /* ← 加这行：6 个导航项，放不下就换行 */
  gap: 10px;
  margin-bottom: 16px;
}
</style>