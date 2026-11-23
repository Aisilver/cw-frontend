import { BehaviouralSubject } from "@/app/classes/subject-event/behavioural-subject-event.class";
import { DefineService } from "@/app/functions/define-service.func";
import type { Roles } from "@shared/common"; 
import type { SignUpStagesTypes } from "../types";
import type { Account, User } from "@shared/entities";
import type { SignUpRequestPayload } from "@shared/routes";

class SigunUpService {
    private payload: SignUpRequestPayload = Object()

    Role = new BehaviouralSubject<Roles>("student")

    SignUpStage = new BehaviouralSubject<SignUpStagesTypes>("bio")

    get NewUser () {
        return this.payload.user
    }

    get NewAccount () {
        return this.payload.account
    }

    get Payload (): SignUpRequestPayload {
        return {
            ...this.payload,
            role: this.Role.getValue()
        }
    }

    setUser(user: User) {
        this.payload.user = user
    }

    setAccount(acct: Account, proileImgFileRef?: string) {
        this.payload.account = acct

        this.payload.profileImageRef = proileImgFileRef
    }

    toBio () {
        this.SignUpStage.emit("bio")
    }

    toAccountSetup () {
        this.SignUpStage.emit("account-setup")
    }

    toCreateAccount () {
        this.SignUpStage.emit("account-creation")
    }
}

export const _SignupService = DefineService("sign-up-service", new SigunUpService())