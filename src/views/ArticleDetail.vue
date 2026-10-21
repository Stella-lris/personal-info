<script  setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useArticleStore } from "../stores/articleStore";

const route = useRoute();
const router = useRouter();
const articleStore = useArticleStore();
const { articles } = storeToRefs(articleStore);

const id = computed(() => Number(route.params.id));                       // 跟随 :id 变化
const article = computed(() => articles.value.find((item) => item.id === id.value));
const currentIndex = computed(() =>
    articles.value.findIndex((item) => item.id === id.value)
);
const prevArticle = computed(() => articles.value[currentIndex.value - 1]);
const nextArticle = computed(() => articles.value[currentIndex.value + 1]);

function goPrev() {
  if (prevArticle.value) {
    router.push({ name: "article-detail", params: { id: prevArticle.value.id } });
  }
}
function goNext() {
  if (nextArticle.value) {
    router.push({ name: "article-detail", params: { id: nextArticle.value.id } });
  }
}
</script>

<template>
  <div class="page-card" v-if="article">
    <h2 class="article-title">{{ article.title }}</h2>
    <p class="article-meta">{{ article.author }} · {{ article.date }}</p>
    <p class="article-content">{{ article.content }}</p>
    <div class="article-pager">
      <button :disabled="!prevArticle" @click="goPrev">上一篇</button>
      <button :disabled="!nextArticle" @click="goNext">下一篇</button>
    </div>
    <RouterLink to="/articles">← 返回列表</RouterLink>
  </div>
  <div class="page-card" v-else>
    <p>没有找到这篇文章。</p>
  </div>
</template>
<style scoped>
.article-title { margin-top: 0; }
.article-meta { color: #999; font-size: 13px; }
.article-content { line-height: 1.8; }
.article-pager {
  display: flex;
  gap: 10px;
  margin: 16px 0;
}
</style>