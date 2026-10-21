<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useUserStore } from "../stores/userStore";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const password = ref("");

function login(){
  if (password.value === "owner"){
    useUserStore().login();
    const target = route.query.redirect || "/home";
    router.replace(target);
  }else {
    ElMessage({ message: "口令不对", type: "error" });
  }
}
</script>
<template>
  <div class="page-card">
    <h2 class="owner-title">身份认证</h2>
    <p>想要进入后台管理，请输入口令：</p>
    <el-form>
      <!-- ★ 本步新知识点：type="password" 密码框 + show-password 可切换显示 -->
      <el-input
          v-model="password"
          type="password"
          show-password
          placeholder="口令"
          clearable
      />

      <!-- 复习：知识点「el-button」（第7步） -->
      <el-button type="primary" @click="login">进入后台</el-button>
    </el-form>
  </div>
</template>
<style scoped>
.owner-title {
  margin-top: 0;
}

.page-card p {
  color: #666;
}
</style>