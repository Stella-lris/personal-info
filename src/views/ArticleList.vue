<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useArticleStore } from "../stores/articleStore";

const articleStore = useArticleStore();
const { articles, articleCount, allTags } = storeToRefs(articleStore);
const selectedTag = ref("");
const keyword = ref("");

const filteredArticles=computed(() => {
  return articles.value.filter((article) =>{
    const matchTag=
        !selectedTag.value || (article.tags || []).includes(selectedTag.value);
    const matchKeyword = article.title
        .toLowerCase()
        .includes(keyword.value.toLowerCase());
    return matchTag && matchKeyword;
  });
});
</script>

<template>
  <div class="page-card">
    <h2 class="article-title">文章列表（共 {{ articleCount }} 篇）</h2>
    <div class="tag-filter">
      <el-tag
          :type="selectedTag === '' ? 'primary' : 'info'"
          @click="selectedTag = ''"
      >全部</el-tag>
      <el-tag
          v-for="tag in allTags"
          :key="tag"
          :type="selectedTag === tag ? 'primary' : 'info'"
          @click="selectedTag = tag"
      >{{ tag }}</el-tag>
    </div>
    <el-input
        v-model="keyword"
        placeholder="搜索标题…"
        clearable
        class="article-search"
    />
    <ul class="article-list">
      <el-empty
          v-if="filteredArticles.length === 0"
          description="没有找到文章"
      />
      <div v-else class="article-list">
        <el-card
            v-for="article in filteredArticles"
            :key="article.id"
            class="article-card"
            shadow="hover"
        >
          <RouterLink :to="{ name: 'article-detail', params: { id: article.id } }">
            {{ article.title }}
          </RouterLink>
          <p class="article-date">{{ article.date }}</p>
          <div class="article-tags">
            <el-tag
                v-for="tag in article.tags || []"
                :key="tag"
                size="small"
                type="info"
            >{{ tag }}</el-tag>
          </div>
        </el-card>
      </div>
    </ul>
  </div>
</template>
<style scoped>
.article-title { margin-top: 0; }
.article-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.article-card {
  width: 220px;
  cursor: pointer;
}
.article-tags {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.article-date { color: #999; font-size: 13px; }
.tag-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0;
}
.tag-filter .el-tag { cursor: pointer; }
.article-search {
  width: 100%;
  margin: 8px 0 4px;
}
</style>