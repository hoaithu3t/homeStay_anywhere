import { defineStore } from "pinia";

export const useUser = defineStore("userId", {
  state: () => ({
    userData: localStorage.getItem("userData"),
  }),

  actions: {
    onChange(data) {
      data
        ? localStorage.setItem("userData", JSON.stringify(data))
        : localStorage.removeItem("userData");
      this.userData = JSON.stringify(data);
    },
  },
});
