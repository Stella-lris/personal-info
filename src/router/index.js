import { createRouter, createWebHashHistory  } from "vue-router";

import ArticleDetail from "../views/ArticleDetail.vue";
import ArticleList from "../views/ArticleList.vue";   // ← 新增
import HomeView from "../views/HomeView.vue";
import ProjectsView from "../views/ProjectsView.vue";
import AboutView from "../views/AboutView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import ProjectList from "../views/ProjectList.vue";
import ProjectDetail from "../views/ProjectDetail.vue";
import ProjectStats from "../views/ProjectStats.vue";
import ManageView from "../views/ManageView.vue";
import ManageProfile from "../views/ManageProfile.vue";
import ManageProjects from "../views/ManageProjects.vue";
import OwnerView from "../views/OwnerView.vue";
import ManageExperiences from "../views/ManageExperiences.vue";
import { useUserStore } from "../stores/userStore";   // ← 新增
import ManageArticles from "../views/ManageArticles.vue";   // ← 新增
import ManagePhotos from "../views/ManagePhotos.vue";   // ← 新增
import ManageMoments from "../views/ManageMoments.vue";

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: { title: "首页" },
  },
  {
    path: "/projects",
    name: "projects",
    component: ProjectsView,
    redirect:{name:"project-list"},
    meta: { title: "项目" },
    children: [                                          // ← 新增：嵌套子路由
      {
        path: "list",                                    // ← 注意：不带前导 /
        name: "project-list",
        component: ProjectList,
        meta: { title: "项目列表" },
      },
      {
        path: ":id",                          // 动态段，第 5 步讲
        name: "project-detail",
        component: ProjectDetail,
        meta: { title: "项目详情" },
      },
      {
        path: "stats",
        name: "project-stats",
        component: ProjectStats,
        meta: { title: "项目统计" },
      },
    ],
  },
  {
    path: "/articles",
    name: "article-list",
    component: ArticleList,
    meta: { title: "文章" },
  },
  {
    path: "/articles/:id",
    name: "article-detail",
    component: ArticleDetail,
    meta: { title: "文章详情" },
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
    meta: { title: "关于" },
  },
  {
    path: "/owner",
    name: "owner",
    component: OwnerView,
    meta: { title: "身份认证" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundView,
    meta: { title: "页面不存在" },
  },
  {
    path: "/manage",
    name: "manage",
    component: ManageView,
    redirect:{name:"manage-profile"},
    meta: { title: "后台管理" , requiresOwner: true},
    children: [
      {
        path: "profile",
        name: "manage-profile",
        component: ManageProfile,
        meta: { title: "编辑个人简介" },
      },
      {
        path: "projects",
        name: "manage-projects",
        component: ManageProjects,
        meta: { title: "编辑项目信息" },
      },
      {
        path: "experiences",
        name: "manage-experiences",
        component: ManageExperiences,
        meta: { title: "编辑个人经历" },
      },
      {
        path: "articles",
        name: "manage-articles",
        component: ManageArticles,
        meta: { title: "编辑文章" },
      },
      {
        path: "photos",
        name: "manage-photos",
        component: ManagePhotos,
        meta: { title: "上传照片" },
      },
      {
        path: "moments",
        name: "manage-moments",
        component: ManageMoments,
        meta: { title: "发布动态" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory (),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});
router.beforeEach((to, from, next) => {
  // 1. 更新浏览器标签页标题
  document.title = to.meta.title ? to.meta.title + " · 个人主页" : "个人主页";

  // 2. 权限拦截：要去受保护页，但没验证身份 → 弹去 /owner，记下原地址
  if (to.meta.requiresOwner && !useUserStore().isOwner) {
    next({ name: "owner", query: { redirect: to.fullPath } });
    return;
  }

  // 3. 其余全部放行
  next();
});
export default router;
