import { defineStore } from "pinia";

class UserService {
    
}

export const _UserService = defineStore("user-service", () => {
    const state = new UserService()

    return { state }
})