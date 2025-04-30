import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as any,  // Initially no user
    gameData: null as any,  // You can also store game-related data here
  }),
  actions: {
    setUser(user: any) {
      this.user = user
    },
    setGameData(data: any) {
      this.gameData = data
    },
  },
})
