<template>
  <section class="section-card" :style="{background:cardBg}">
  <header class="card-head">
    <slot name="title"/> <!-- 具名插槽 -->
  </header>
    <div class="card-body">
      <slot/> <!-- 默认插槽 -->
    </div>
  </section>
</template>

<script setup>
defineProps({
  cardBg:{type:String,default:"#fff1f6"},
});
</script>
<style scoped>
.section-card {
  max-width: 600px;
  width: 100%;
  margin: 20px auto 0;
  padding: 32px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  box-shadow: 0 14px 44px rgba(0, 0, 0, 0.18),
    0 1px 0 rgba(255, 255, 255, 0.7) inset;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.section-card p {
  line-height: 1.8;
  color: #444;
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
}
</style>