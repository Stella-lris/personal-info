<template>
<footer class="site-footer">
  <p>© 2026 {{ author }} · 个人信息</p>
</footer>
</template>
<script setup>
defineProps({
  author:{
    type:String,default:"杜映红"
  },
})
</script>
<style scoped>
.site-footer {
  max-width: 600px;
  margin: 20px auto 0;
  padding: 12px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  text-align: center;
  color: #999;
  font-size: 13px;
}

.site-footer p {
  margin: 0;
}
</style>