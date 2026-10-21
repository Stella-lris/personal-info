import { defineStore } from "pinia";

const defaultPhotos=[
    {
        id: 1,
        url: "https://dummyimage.com/300x200/42b883/ffffff&text=Photo+1",
        caption: "示例照片：说明文字",
        date: "2025-09-01",
    },
    {
        id: 2,
        url: "https://dummyimage.com/300x200/6f9e8d/ffffff&text=Photo+2",
        caption: "示例照片：第二张",
        date: "2025-09-02",
    },
];

const defaultMoments = [
    {
        id: 1,
        content: "完成了个人主页的照片墙功能，点击图片能放大，挺有成就感的。",
        images: ["https://dummyimage.com/300x200/42b883/ffffff&text=Moment"],
        date: "2025-09-03",
    },
    {
        id: 2,
        content: "今天学习了 Pinia 的 store 三件套。",
        images: [],
        date: "2025-09-01",
    },
];

function today() {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mm}-${dd}`;
}

export const usePhotoStore=defineStore("photo",{
    state: () => {
        const saved = JSON.parse(localStorage.getItem("myPhotos")) || defaultPhotos;
        // 老数据没有 caption/date 字段 → 统一补空串，保证字段一定存在（和项目 store 同一套）
        return {photos: saved.map((p) => ({caption: "", date: "", ...p}))};
    },
    getters: {
        photoCount: (state) => state.photos.length,
    },
    actions: {
        addPhoto(url, caption) {
            this.photos.unshift({ id: Date.now(), url, caption, date: today() });
            localStorage.setItem("myPhotos", JSON.stringify(this.photos));
        },
        removePhoto(id) {
            this.photos = this.photos.filter((p) => p.id !== id);
            localStorage.setItem("myPhotos", JSON.stringify(this.photos));
        },
        persist() {
            localStorage.setItem("myPhotos", JSON.stringify(this.photos));
        },
    },
});

export const useMomentStore = defineStore("moment", {
    state: () => {
        const saved = JSON.parse(localStorage.getItem("myMoments")) || defaultMoments;
        // 老数据没有 content/images/date → 补下界；images 必须补 []，否则 .length 会报错
        return { moments: saved.map((m) => ({ content: "", images: [], date: "", ...m })) };
    },
    getters: {
        momentCount: (state) => state.moments.length,
    },
    actions: {
        addMoment(content, images) {
            this.moments.unshift({
                id: Date.now(),
                content,
                images: images || [],
                date: today(),
            });
            localStorage.setItem("myMoments", JSON.stringify(this.moments));
        },
        removeMoment(id) {
            this.moments = this.moments.filter((m) => m.id !== id);
            localStorage.setItem("myMoments", JSON.stringify(this.moments));
        },
        persist() {
            localStorage.setItem("myMoments", JSON.stringify(this.moments));
        },
    },
})

