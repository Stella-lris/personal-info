<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "../../stores/profileStore.js";
import InfoDisplay from "./InfoDisplay.vue";
import InfoEdit from "./InfoEdit.vue";

defineProps({
  cardBg: { type: String, default: "#fff1f6" },
  showEdit: { type: Boolean, default: true },
  showCollapse: { type: Boolean, default: true },
  showColorToggle: { type: Boolean, default: true },
});

const emit = defineEmits(["toggleColors"]);

const profileStore = useProfileStore();
const { info: information } = storeToRefs(profileStore);
const isEditing = ref(false);
const isInfoOpen = ref(true);

function toggleEdit() {
  if (isEditing.value) {
    information.value.summary = information.value.summarytext
      .split(/[,，]/)
      .map((skill) => skill.trim())
      .filter((skill) => skill);
    information.value.searchText = "";
    profileStore.save();
      } else {
    information.value.summarytext = information.value.summary.join(",");
  }
  isEditing.value = !isEditing.value;
}

function onAvatarChange(file) {
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = (event) => {
    information.value.avatar = event.target.result;
  };
  reader.readAsDataURL(file);
}
</script>

<template>
  <section
    class="profile-card"
    :style="{ backgroundColor: cardBg }"
  >
    <div class="card-head">
      <p class="card-title">
        个人基本信息
        <button v-if="showCollapse" @click="isInfoOpen = !isInfoOpen">
          {{ isInfoOpen ? "（收起）" : "（展开）" }}
        </button>
      </p>
      <div class="card-actions">
        <button v-if="showEdit" @click="toggleEdit">
          {{ isEditing ? "保存修改" : "编辑个人信息" }}
        </button>
        <button v-if="showColorToggle" @click="emit('toggleColors')">模式切换</button>
      </div>
    </div>

    <InfoDisplay
      v-if="!isEditing"
      :information="information"
      :is-info-open="isInfoOpen"
    />

    <InfoEdit v-else :information="information" @avatar-change="onAvatarChange" />
  </section>
</template>

<style scoped>
.profile-card {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 32px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  box-shadow: 0 14px 44px rgba(0, 0, 0, 0.18),
    0 1px 0 rgba(255, 255, 255, 0.7) inset;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.profile-card p {
  line-height: 1.8;
  color: #444;
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.card-title {
  margin: 0;
  font-size: 18px;
  color: #333;
  font-weight: bold;
}

.card-title button {
  margin-left: 6px;
  padding: 4px 10px;
  font-size: 13px;
}

.card-actions {
  display: flex;
  gap: 8px;
}

.card-actions button {
  padding: 5px 12px;
  font-size: 13px;
}

</style>