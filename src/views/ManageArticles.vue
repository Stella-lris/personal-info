<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import { useArticleStore } from "../stores/articleStore";

const articleStore = useArticleStore();
const { articles, allTags } = storeToRefs(articleStore);

const isEdit = ref(false);        // ← 新增：是否编辑模式
const editId = ref(null);         // ← 新增：正在编辑的 id

// 弹窗状态与表单数据
const dialogVisible = ref(false);
const form = ref({ title: "", content: "" ,tags:[]});

// ← 新增：编辑，回填数据
function openEdit(row) {
  isEdit.value = true;
  editId.value = row.id;
  form.value = { title: row.title, content: row.content,tags: [...(row.tags || [])] };
  dialogVisible.value = true;
}

function openAdd() {
  isEdit.value = false;           // ← 补：退出编辑模式
  editId.value = null;            // ← 补
  form.value = { title: "", content: "", tags: []  };
  dialogVisible.value = true;
}
function submitForm() {                              // ← 原 submitAdd 改名并加分支
  if (!form.value.title.trim()) return;
  if (isEdit.value) {
    // 编辑：只更新标题和正文（保留原作者/日期/标签）
    articleStore.updateArticle(editId.value, {
      title: form.value.title,
      content: form.value.content,
      tags: form.value.tags,
    });
  } else {
    articleStore.addArticle({
      title: form.value.title,
      content: form.value.content,
      tags: form.value.tags,
      author: "杜映红",
      date: new Date().toLocaleDateString(),
    });
  }
  ElMessage({ message: "保存成功", type: "success" });
  dialogVisible.value = false;
}

function handleRemove(id) {
  articleStore.removeArticle(id);
  ElMessage({ message: "已删除", type: "info" });
}
</script>

<template>
  <div class="manage-articles">
    <el-button type="primary" @click="openAdd">新增文章</el-button>

    <h3>文章管理</h3>
    <el-table :data="articles" style="width: 100%">
      <el-table-column prop="title" label="标题" min-width="160" />
      <el-table-column prop="author" label="作者" width="100" />
      <el-table-column prop="date" label="日期" width="120" />
      <el-table-column label="标签" width="160">
        <template #default="{ row }">
          <el-tag
              v-for="tag in row.tags || []"
              :key="tag"
              size="small"
              type="info"
          >{{ tag }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="140">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="openEdit(row)">编辑</el-button>
          <el-popconfirm
              title="确定删除这篇吗？"
              @confirm="handleRemove(row.id)"
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        v-model="dialogVisible"
        :title="isEdit ? '编辑文章' : '新增文章'"
        width="520px"
    >
      <el-form label-width="70px">
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="请输入标题" clearable />
        </el-form-item>
        <el-form-item label="正文">
          <el-input
              v-model="form.content"
              type="textarea"
              :rows="5"
              placeholder="请输入正文"
          />
        </el-form-item>
        <el-form-item label="标签">
          <el-select
              v-model="form.tags"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="选择已有标签，或输入后回车新建"
          >
            <el-option
                v-for="tag in allTags"
                :key="tag"
                :label="tag"
                :value="tag"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.manage-articles input,
.manage-articles textarea {
  display: block;
  width: 100%;
  margin-bottom: 8px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.manage-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.manage-head h3 { margin: 0; }
.article-row input {
  width: auto;
  flex: 1;
  margin: 0 6px 0 0;
}
</style>