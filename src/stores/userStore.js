import { defineStore } from "pinia";
export const useUserStore = defineStore("user",{
    // state：仓库里存的数据，写成函数返回对象
    state:()=>({
        isOwner: JSON.parse(localStorage.getItem("isOwner"))||false,
    }),
    // 后面会学到：getters

    // 后面会学到：actions
    actions:{
        login(){
            this.isOwner = true;
            localStorage.setItem("isOwner", JSON.stringify(this.isOwner));
        },
        logout() {
            this.isOwner = false;
            localStorage.setItem("isOwner", JSON.stringify(this.isOwner));
        },
    },
})