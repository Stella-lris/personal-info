
<script setup>
import { storeToRefs } from "pinia";
import { useMomentStore } from "../../stores/photoStore";

const momentStore = useMomentStore();
const { moments } = storeToRefs(momentStore);
</script>


<template>
  <div>
    <div class="moment-stream" v-if="moments.length">
      <div class="moment-card" v-for="moment in moments" :key="moment.id">
        <p class="moment-text">{{ moment.content }}</p>

        <div class="moment-images" v-if="moment.images.length">
          <el-image
              v-for="(img, index) in moment.images"
              :key="index"
              class="moment-img"
              :src="img"
              :preview-src-list="moment.images"
              fit="cover"
              preview-teleported
              hide-on-click-modal
          />
        </div>

        <p class="moment-date">{{ moment.date }}</p>
      </div>
    </div>

    <el-empty v-else description="还没有动态，去后台发一条" :image-size="60" />
  </div>
</template>

<style scoped>
.moment-stream {
  display: flex;
  flex-direction: column;   /* 动态竖着排（和照片墙的横排不同） */
  gap: 12px;
}
.moment-card {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.55);
}
.moment-text {
  margin: 0 0 8px;
  color: #444;
  line-height: 1.7;
}
.moment-images {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.moment-img {
  width: 100px;
  height: 100px;
  border-radius: 8px;
}
.moment-date {
  margin: 8px 0 0;
  font-size: 12px;
  color: #999;
}
</style>