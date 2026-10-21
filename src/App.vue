<script setup>
import { storeToRefs } from "pinia";// ← 新增
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/userStore";
import SiteHeader from "./components/CommonComponents/SiteHeader.vue";   // 原样，没动
import SiteFooter from "./components/CommonComponents/SiteFooter.vue";   // 原样，没动

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();                             // ← 新增：拿到 store 实例
const { isOwner } = storeToRefs(userStore);

function handleCommand(cmd) {
  if (cmd === "logout") {
    userStore.logout();
    router.push("/home");
  }
}
</script>

<template>
  <div>
    <SiteHeader title="个人主页" />                                        <!-- 原样，没动 -->

    <el-container class="app-layout">            <!-- ★新增：左右两栏的容器（flex 一行排布） -->
      <el-aside width="160px" class="sidebar">
        <el-menu
            router
            :default-active="route.path"
            active-text-color="#6f9e8d"
            class="sidebar-nav"
        >
          <el-menu-item index="/home">
            <el-icon><HomeFilled /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/projects">
            <el-icon><Files /></el-icon>
            <span>项目</span>
          </el-menu-item>
          <el-menu-item index="/articles">
            <el-icon><Document /></el-icon>
            <span>文章</span>
          </el-menu-item>
          <el-menu-item index="/about">
            <el-icon><User /></el-icon>
            <span>关于</span>
          </el-menu-item>
          <el-menu-item index="/manage">
            <el-icon><Setting /></el-icon>
            <span>后台</span>
          </el-menu-item>
        </el-menu>
        <div class="sidebar-user">                            <!-- ← 新增 -->
          <span>{{ isOwner ? "已登录" : "未登录" }}</span>
          <el-dropdown v-if="isOwner" trigger="click" @command="handleCommand">
            <span class="user-trigger">管理</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-aside>

      <el-main class="content">            <!-- ★新增：右边内容区盒子 -->
        <RouterView /><!-- 原内容，包进 content 里 -->
        <el-backtop :visibility-height="100" :right="40" :bottom="40">
          <div class="backtop-box">↑</div>
        </el-backtop>
      </el-main>
    </el-container>

    <SiteFooter author="杜映红" />      <!-- 原样，没动 -->
  </div>
</template>

<style scoped>
.app-layout {                          /* ★新增 */
  display: flex;
  gap: 24px;
  max-width: 900px;
  margin: 0 auto;
  align-items: flex-start;
}

.content {
  flex: 1;
  min-width: 0;
}

.sidebar {                             /* ★新增：固定宽、固定的侧栏 */
  width: 160px;
  flex-shrink: 0;
  position: sticky;
  top: 88px;
  left: max(20px, calc(50% - 450px));
  padding: 16px 12px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
}
.sidebar-nav {
  border-right: none;      /* 去掉 el-menu 默认右边框，放进圆角卡片更好看 */
}
.sidebar-nav .el-menu-item.is-active {
  background: #6f9e8d;
  color: #fff;
}
.sidebar-user {                        /* ← 新增 */
  margin-top: 12px;
  font-size: 13px;
  color: #4d7868;
  text-align: center;
}
.sidebar-user .user-trigger {
  display: inline-block;
  margin-top: 6px;
  border: 1px solid rgba(111, 158, 141, 0.4);
  background: #fff;
  color: #4d7868;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 13px;
  cursor: pointer;
}
.backtop-box {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #6f9e8d;
  color: #fff;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}
</style>