<script setup>
defineProps({
  information: { type: Object, required: true },
});

const emit = defineEmits(["avatarChange"]);

function handleChange(uploadFile) {
  if (uploadFile && uploadFile.raw) {
    emit("avatarChange", uploadFile.raw);   // .raw 才是真正的 File 对象
  }
}
</script>

<template>
  <div class="edit-form">
    <p>头像：</p>
    <el-upload
        accept="image/*"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleChange"
    >
      <el-button type="primary">选择图片</el-button>
    </el-upload>
    <p>姓名：<input type="text" v-model="information.name" /></p>
    <p>专业班级：<input type="text" v-model="information.class" /></p>
    <p>出生年月：<input type="month" v-model="information.birth" /></p>
    <p>电话：<input type="tel" v-model="information.phone" /></p>
    <p>邮箱：<input type="email" v-model="information.email" /></p>
    <p>籍贯：<input type="text" v-model="information.nativePlace" /></p>
    <p>
      个人简介：<input
        type="text"
        v-model="information.profile"
        class="wide-input"
      />
    </p>
    <p>
      技能（用逗号分隔）：<input
        type="text"
        v-model="information.summarytext"
        class="wide-input"
      />
    </p>
    <!-- 教育背景：数据在 information.education（F1 已加），保存由 ProfileCard 的"保存修改"负责 -->
    <el-form label-width="80px" class="edu-form">
      <p class="edu-title">教育背景</p>

      <el-form-item label="学历">
        <el-input v-model="information.education.degree" placeholder="如 本科" />
      </el-form-item>

      <el-form-item label="学校">
        <el-input v-model="information.education.school" placeholder="学校名称" />
      </el-form-item>

      <el-form-item label="专业">
        <el-input v-model="information.education.major" placeholder="专业 / 院系" />
      </el-form-item>

      <el-form-item label="起止时间">
        <div class="time-range">
          <el-input v-model="information.education.start" style="flex: 1" placeholder="如 2024.09" />
          <span>—</span>
          <el-input v-model="information.education.end" style="flex: 1" placeholder="如 2028.06" />
        </div>
      </el-form-item>

      <el-form-item label="主修课程">
        <el-input
            v-model="information.education.courses"
            type="textarea"
            :rows="2"
            placeholder="用顿号分隔，如 数据结构、计算机网络"
        />
      </el-form-item>
    </el-form>
    <el-form label-width="80px" class="edu-form">
      <p class="edu-title">技术栈</p>

      <el-form-item label="技术">
        <el-select
            v-model="information.techStack"
            multiple
            filterable
            allow-create
            default-first-option
            style="width: 100%"
            placeholder="输入后回车添加，点标签上的 × 删除"
        >
          <el-option
              v-for="tech in information.techStack"
              :key="tech"
              :label="tech"
              :value="tech"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.wide-input {
  width: 300px;
  max-width: 100%;
}

.edu-title {
  font-weight: bold;
  color: #444;
  margin: 16px 0 8px;
}

.time-range {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>