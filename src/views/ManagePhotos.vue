<script setup>
import { storeToRefs } from "pinia";
import { usePhotoStore } from "../stores/photoStore";

const photoStore = usePhotoStore();
const { photos, photoCount } = storeToRefs(photoStore);

function handleSelect(uploadFile) {
  const file = uploadFile && uploadFile.raw;
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    photoStore.addPhoto(reader.result, "");   // base64 进仓库，说明先留空
  };
  reader.readAsDataURL(file);
}
</script>
<template>
  <div>
  <h3>上传照片（共 {{ photoCount }} 张）</h3>
  <el-upload
      accept="image/*"
      multiple
      :auto-upload="false"
      :show-file-list="false"
      :on-change="handleSelect"
  >
    <el-button type="primary">选择照片（可多选）</el-button>
  </el-upload>

  <div class="photo-grid" v-if="photos.length">
    <div class="photo-item" v-for="photo in photos" :key="photo.id">
      <img :src="photo.url" :alt="photo.caption" />
      <p class="caption-row">
        说明：
        <input
            type="text"
            v-model="photo.caption"
            @change="photoStore.persist()"
            placeholder="给这张照片写一句话"
        />
      </p>
      <p class="meta-row">
        <span>{{ photo.date }}</span>
        <button @click="photoStore.removePhoto(photo.id)">删除</button>
      </p>
    </div>
  </div>
  <el-empty v-else description="还没有照片，点上面按钮上传" :image-size="80" />
  </div>
</template>
<style scoped>
.photo-grid {
display: flex;
flex-wrap: wrap;      /* 上一课的知识：装不下就换行 */
gap: 16px;
margin-top: 16px;
}
.photo-item {
width: 200px;         /* 固定宽度 → 一行放几张由容器决定 */
border: 1px solid #e5e5e5;
border-radius: 12px;
padding: 10px;
background: rgba(255, 255, 255, 0.6);
}
.photo-item img {
width: 100%;
height: 130px;
object-fit: cover;
border-radius: 8px;
display: block;
}
.caption-row input {
width: 100%;
box-sizing: border-box;   /* 边框不用自己写：全局 input[type="text"] 规则会命中它 */
}
.meta-row {
display: flex;
justify-content: space-between;
align-items: center;
font-size: 12px;
color: #999;
}
.meta-row button {
padding: 3px 10px;
font-size: 12px;
}
</style>