
<script setup>
const searchText=defineModel();
//defineModel(),声明一个可以双向绑定的值，父组件用v-model接住
</script>
<template>
  <input type="text" v-model="searchText" placeholder="请输入关键字搜索..">
</template>
<style></style>