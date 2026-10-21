import { defineStore } from "pinia";
// 默认项目数据：第一次打开时兜底
const defaultProjects = [
    {
        name: "个人信息1",
        img: "https://dummyimage.com/160x100/42b883/ffffff&text=Robot",
        desc: "简介",
        date: "2025-09-01",
    },
    {
        name: "个人信息2",
        img: "https://dummyimage.com/160x100/42b883/ffffff&text=Robot",
        desc: "简介",
        date: "2025-10-15",
    },
];

// 今天，格式固定 YYYY-MM-DD（补零，保证等长可比较）
function today() {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mm}-${dd}`;
}

export const useProjectStore = defineStore("project",{
    state: () => {
        const saved = JSON.parse(localStorage.getItem("myProjects")) || defaultProjects;
        // 老数据没有 date 字段 → 统一补空串，保证字段一定存在
        return { projects: saved.map((p) => ({ date: "", ...p })) };
    },
    getters: {
        projectCount: (state) => state.projects.length,
    },
    actions: {
        addProject() {
            this.projects.push({ name: "新项目", img: "", desc: "简介" , date: today()});
            localStorage.setItem("myProjects", JSON.stringify(this.projects));
        },
        updateProject(index, data) {
            Object.assign(this.projects[index], data);
            localStorage.setItem("myProjects", JSON.stringify(this.projects));
        },
        removeProject(index) {
            this.projects.splice(index, 1);
            localStorage.setItem("myProjects", JSON.stringify(this.projects));
        },
        persist() {
            localStorage.setItem("myProjects", JSON.stringify(this.projects));
        },
},
});