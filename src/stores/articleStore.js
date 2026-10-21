import { defineStore } from "pinia";

const defaultArticles = [
    { id: 1, title: "我的第一篇博客", content: "这里是正文内容。", author: "杜映红", date: "2025-01-01", tags: ["生活", "随笔"] },
    { id: 2, title: "学习 Vue 的小结", content: "今天学会了 Pinia。", author: "杜映红", date: "2025-02-01", tags: ["学习", "Vue"] },
];

export const useArticleStore=defineStore("article",{
    state:()=>({
        articles:JSON.parse(localStorage.getItem("articles"))||defaultArticles,
    }),

    // 后面会学到：getters
    getters:{
        articleCount:(state) => state.articles.length,
        allTags: (state) => {
            const set = new Set();
            state.articles.forEach((article) => {
                (article.tags || []).forEach((tag) => set.add(tag));
            });
            return [...set];
        }
    },
    // 后面会学到：actions
    actions:{
        addArticle (data){
            const id=Date.now();
            this.articles.push({ id, tags: [], ...data });
            localStorage.setItem("articles", JSON.stringify(this.articles));
        },
        updateArticle(id,data){
            const target =this.articles.find((item)=>item.id===id);
            if(target){
                Object.assign(target, data);
            }
            localStorage.setItem("articles", JSON.stringify(this.articles));
        },
        removeArticle(id){
            this.articles = this.articles.filter((item) => item.id !== id);
            localStorage.setItem("articles", JSON.stringify(this.articles));
        }
    }

})