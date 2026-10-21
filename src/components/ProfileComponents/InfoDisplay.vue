<script setup>
defineProps({
  information: { type: Object, required: true },
  isInfoOpen: { type: Boolean, default: true },
});
</script>

<template>
  <div>
    <div class="info-head">
      <el-avatar :src="information.avatar" :size="96" />
      <p class="info-name">姓名：{{ information.name }}</p>
    </div>

    <el-descriptions v-if="isInfoOpen" :column="1" border>
      <el-descriptions-item label="专业班级">
        {{ information.class }}
      </el-descriptions-item>
      <el-descriptions-item label="出生年月">
        {{ information.birth || "未填写" }}
      </el-descriptions-item>
      <el-descriptions-item label="电话">
        {{ information.phone || "未填写" }}
      </el-descriptions-item>
      <el-descriptions-item label="邮箱">
        {{ information.email || "未填写" }}
      </el-descriptions-item>
      <el-descriptions-item label="籍贯">
        {{ information.nativePlace || "未填写" }}
      </el-descriptions-item>
      <el-descriptions-item label="个人简介">
        {{ information.profile }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped>
.info-head {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 12px 0;
}

.info-name {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
</style>