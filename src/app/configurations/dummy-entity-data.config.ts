import type { Account, User } from "@shared/entities";

export const APP_ENTITY_DUMMY_DATA = {
    USER: {
        firstName: "",
        lastName: "",
        gender: "male",
        maritalStatus: "single"
    } as User,

    ACCOUNT: {
        userName: "",
        password: ""
    } as Account
}