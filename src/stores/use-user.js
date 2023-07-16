import { defineStore } from 'pinia'

export const useUser = defineStore('userId', {
  state: () => ({
      id: null,
      role: null,
      name: null,
      token: null,
  }),

  actions: {
    onChangeName(name) {
      this.name = name;
    },
  }
})