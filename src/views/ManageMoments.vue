<script setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useMomentStore } from "../stores/photoStore";

const momentStore = useMomentStore();
const { moments, momentCount } = storeToRefs(momentStore);

const content = ref("");        // 草稿：文字
const draftImages = ref([]);    // 草稿：本次选的图（还没发布）

const canPublish = computed(
    () => content.value.trim() !== "" || draftImages.value.length > 0
);

function handleSelect(uploadFile) {
  const file = uploadFile && uploadFile.raw;
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    draftImages.value.push(reader.result);   // 先塞进草稿，不着急发布
  };
  reader.readAsDataURL(file);
}

function removeDraft(index) {
  draftImages.value.splice(index, 1);        // 草稿图选错了能撤
}

function publish() {
  if (!canPublish.value) return;
  momentStore.addMoment(content.value.trim(), draftImages.value);
  content.value = "";                        // 发布后清空草稿
  draftImages.value = [];
}
</script>

<template>
  <div>
    <h3>发布动态（共 {{ momentCount }} 条）</h3>

    <div class="publish-box">
      <el-input
          v-model="content"
          type="textarea"
          :rows="3"
          maxlength="200"
          show-word-limit
          placeholder="写点什么…"
      />

      <el-upload
          accept="image/*"
          multiple
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleSelect"
      >
        <el-button>添加图片</el-button>
      </el-upload>

      <div class="draft-images" v-if="draftImages.length">
        <div class="draft-item" v-for="(img, index) in draftImages" :key="index">
          <img :src="img" alt="待发布图片" />
          <span class="draft-remove" @click="removeDraft(index)">×</span>
        </div>
      </div>

      <el-button type="primary" :disabled="!canPublish" @click="publish">
        发布
      </el-button>
    </div>

    <div class="moment-list" v-if="moments.length">
      <div class="moment-item" v-for="moment in moments" :key="moment.id">
        <p class="moment-content">{{ moment.content }}</p>
        <div class="moment-images" v-if="moment.images.length">
          <img
              v-for="(img, index) in moment.images"
              :key="index"
              :src="img"
              alt="动态图片"
          />
        </div>
        <p class="moment-meta">
          <span>{{ moment.date }}</span>
          <button @click="momentStore.removeMoment(moment.id)">删除</button>
        </p>
      </div>
    </div>
    <el-empty v-else description="还没有动态" :image-size="80" />
  </div>
</template>

<style scoped>
.publish-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.publish-box .el-button {
  align-self: flex-start;     /* 按钮不撑满整行 */
}
.draft-images {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.draft-item {
  position: relative;
}
.draft-item img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
  display: block;
}
.draft-remove {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 18px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 13px;
  cursor: pointer;
}
.moment-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.moment-item {
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.6);
}
.moment-content {
  margin: 0 0 8px;
  color: #444;
}
.moment-images {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.moment-images img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  display: block;
}
.moment-meta {
  display: flex;
  justify-content: space-between;
  margin: 8px 0 0;
  font-size: 12px;
  color: #999;
}
.moment-meta button {
  padding: 3px 10px;
  font-size: 12px;
}
</style>