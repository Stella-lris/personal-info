<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useExperienceStore } from "../stores/profileStore.js";


const experienceStore = useExperienceStore();
const { list: experiences } = storeToRefs(experienceStore);   // 解构并改名

function addItem() {
  experiences.value.push({ time: "20XX", text: "新的一段经历" });
}

function removeItem(index) {
  experiences.value.splice(index, 1);
}

function onSave() {                // ← 新增：修掉模板里 @click="onSave" 没有对应函数的问题
  experienceStore.save();
}
</script>
<template>
  <section class="exp-card">
    <header class="card-head">
      <p class="card-title">编辑个人经历</p>
      <div class="card-actions">
        <button @click="addItem">添加一条</button>
        <button @click="onSave">保存修改</button>
      </div>
    </header>

    <div v-for="(item, index) in experiences" :key="index" class="exp-item">
      <p>时期：<input v-model="item.time" /></p>
      <p>经历：<input v-model="item.text" class="wide-input" /></p>
      <button @click="removeItem(index)">删除</button>
    </div>
  </section>
</template>
<style scoped>
.exp-card {
  max-width: 600px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 14px;
}
.card-head {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 12px;
}
.card-title {
  margin: 0;
  font-weight: bold;
  color: #333;
}
.card-actions {
  display: flex;
  gap: 8px;
}
.exp-item {
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 12px;
  background: rgba(255, 255, 255, 0.5);
}
.exp-item p {
  margin: 6px 0;
  color: #444;
}
.wide-input {
  width: 300px;
  max-width: 100%;
}
</style>