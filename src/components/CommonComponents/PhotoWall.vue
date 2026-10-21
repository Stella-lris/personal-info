<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { usePhotoStore } from "../../stores/photoStore";

const photoStore = usePhotoStore();
const { photos } = storeToRefs(photoStore);

// 预览备选集：只抽 url，算一次，N 张图共用同一个数组
const previewList = computed(() => photos.value.map((p) => p.url));
</script>

<template>
  <div>
    <div class="photo-wall" v-if="photos.length">
      <div class="wall-item" v-for="photo in photos" :key="photo.id">
        <el-image
            class="wall-img"
            :src="photo.url"
            :preview-src-list="previewList"
            fit="cover"
            preview-teleported
            hide-on-click-modal
        />
        <p class="wall-caption">{{ photo.caption || "无说明" }}</p>
      </div>
    </div>
    <el-empty v-else description="还没有照片，去后台上传" :image-size="60" />
  </div>
</template>

<style scoped>
.photo-wall {
  display: flex;
  flex-wrap: wrap;      /* 复习：装不下就换行 */
  gap: 12px;
}
.wall-item {
width: 150px;
}
.wall-img {
width: 100%;
height: 150px;
border-radius: 10px;
display: block;       /* 去掉图片底部的空隙 */
}
.wall-caption {
margin: 6px 0 0;
font-size: 12px;
color: #888;
text-align: center;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}

</style>