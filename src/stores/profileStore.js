import { defineStore } from "pinia";

// 默认个人资料：第一次打开时兜底（字段和旧代码一致）
const defaultProfile = {
  avatar: "https://dummyimage.com/160x100/42b883/ffffff&text=Robot",
  name: "杜映红",
  class: "24计科1班",
  profile: "喜欢",
    birth: "",          // 出生年月，格式 YYYY-MM
    phone: "",          // 电话
    email: "",          // 邮箱
    nativePlace: "",    // 籍贯
  summary: ["画画", "唱歌"],
  searchText: "",
  summarytext: "",
    education: {
        school: "示例大学",
        major: "计算机科学与技术",
        degree: "本科",
        start: "2024.09",
        end: "2028.06",
        courses: "数据结构、计算机网络、Vue 全栈开发",
    },
    techStack: ["Vue", "JavaScript", "HTML/CSS", "Pinia", "Git"],
};
const defaultExperiences = [
  { time: "2025 至今", text: "24 计科专业，学习 Vue 全家桶" },
  { time: "2024", text: "第一次写个人网页作业" },
];
export const useProfileStore = defineStore("profile",{
state: () => ({
    info: { ...defaultProfile, ...JSON.parse(localStorage.getItem("myProfile")) },
  }),
  actions: {
      save() {
        localStorage.setItem("myProfile", JSON.stringify(this.info));
      },
    },
})

export const useExperienceStore = defineStore("experience",{
 state: () => ({
    list: JSON.parse(localStorage.getItem("myExperiences")) || defaultExperiences,
  }),
  actions: {
      save() {
        localStorage.setItem("myExperiences", JSON.stringify(this.list));
      },
    },
});
