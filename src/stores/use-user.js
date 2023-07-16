import { defineStore } from 'pinia'

export const useUser = defineStore('userId', {
  state: () => ({
      userData : localStorage.getItem('userData')
  }),

  actions: {
    onChange(data) {
      localStorage.setItem('userData', JSON.stringify(data))
      this.userData = JSON.stringify(data);
    },
  }
})