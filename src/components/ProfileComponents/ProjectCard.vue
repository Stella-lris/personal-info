<template>
  <SectionCard :card-bg="cardBg">
    <template #title>
      <p class="project-title">项目展示</p>
      <div class="title-actions">
        <button @click="addProject">添加项目</button>
        <button @click="toggleEdit">{{ isEditing ? "保存修改" : "编辑我的项目" }}</button>
      </div>
    </template>

    <!--展示模式 -->
    <div class="project-list" v-if="!isEditing">
      <ProjectItem :projects="projects">
        <template #default="{project}">
          <!--要用子组件递出来的数据，就先在 <template #default="{ project }"> 里签收。 -->
          <img :src="project.img" class="project-img" alt="项目图片" />
          <p class="project-name">{{ project.name }}</p>
          <p class="project-desc">{{ project.desc }}</p>
          <p class="project-date">{{ project.date || "未填日期" }}</p>
        </template>
      </ProjectItem>
    </div>
    <div v-else>
        <div class="edit-item" v-for="(project,index) in projects" :key="project.name">
          <input type="file" @change="onUpload(index,$event)" accept="image/*" >
          <p class="project-name">名称：<input v-model="project.name"></p>
          <p class="project-desc">简介：<input v-model="project.desc" class="wide-input" ></p>
          <p class="project-date">完成日期：<input type="date" v-model="project.date"></p>
          <button @click="removeProject(index)">删除本项目</button>
        </div>
      </div>
    </SectionCard>
</template>
<script setup>
import {ref} from "vue";
import { storeToRefs } from "pinia";
import { useProjectStore } from "../../stores/projectStore";
import SectionCard from "../CommonComponents/SectionCard.vue";
import ProjectItem from "../CommonComponents/ProjectItem.vue";
defineProps({cardBg:{type:String, default:"#fff1f6"}});

const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);
const isEditing=ref(false)

function onUpload (index,event) {
  const file=event.target.files[0]
  if(!file) return;
  const reader=new FileReader();
  reader.onload=() =>{
    projects.value[index].img=reader.result;
  };
  reader.readAsDataURL(file);
}

function toggleEdit(){
  if (isEditing.value){
    projectStore.persist();
  }
  isEditing.value=!isEditing.value;
}
function addProject(){
  projectStore.addProject();
  isEditing.value = true;          // 顺便进入编辑模式，方便马上改
}
function removeProject(index) {
  projectStore.removeProject(index);               // ← 新增：删除
}

</script>
<style scoped>
.project-title {
  margin: 0;
  font-weight: bold;
  color: #444;
}

.project-list {
  display: flex;
  gap: 16px;
}

.edit-item {
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 12px;
  background-color: rgba(255, 255, 255, 0.6);
}
.project-date {
  margin: 6px 0 0;
  font-size: 12px;
  color: #999;
}

.wide-input {
  width: 260px;
  max-width: 100%;
}
.project-img {
  width: 100%;
  max-height: 120px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.project-name {
  margin: 8px 0 4px;
  font-weight: bold;
  color: #444;
}

.project-desc {
  margin: 0;
  font-size: 13px;
  color: #888;
}
.title-actions {
  display: flex;
  gap: 8px;
}
</style>