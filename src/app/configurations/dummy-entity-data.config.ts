import type { Account, User } from "@shared/entities";
import { CopyOf } from "../functions/copy-of.func";

export const APP_ENTITY_DUMMY_DATA = {
    USER: CopyOf({
        firstName: "",
        lastName: "",
        gender: "male",
        maritalStatus: "single"
    }) as User,

    ACCOUNT: CopyOf({
        userName: "",
        password: ""
    }) as Account
}