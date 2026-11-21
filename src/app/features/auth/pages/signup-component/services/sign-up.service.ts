import { BehaviouralSubject } from "@/app/classes/subject-event/behavioural-subject-event.class";
import { APP_ENTITY_DUMMY_DATA } from "@/app/configurations/dummy-entity-data.config";
import { CopyOf } from "@/app/functions/copy-of.func";
import { DefineService } from "@/app/functions/define-service.func";
import type { Roles } from "@shared/common"; 
import type { SignUpStagesTypes } from "../types";
import type { Account, User } from "@shared/entities";
import type { SignUpRequestData } from "@shared/routes";

class SigunUpService {
    private payload: SignUpRequestData = Object()

    Role = new BehaviouralSubject<Roles>("student")

    SignUpStage = new BehaviouralSubject<SignUpStagesTypes>("account-setup")

    get NewUser () {
        return this.payload.user
    }

    get NewAccount () {
        return this.payload.account
    }

    setUser(user: User) {
        this.payload.user = user
    }

    setAccount(acct: Account, proileImgFileRef?: string) {
        this.payload.account = acct

        this.payload.profileImageRef = proileImgFileRef
    }

    toAccountSetup () {
        this.SignUpStage.emit("account-setup")
    }

    toFinished () {
        this.SignUpStage.emit("finished")
    }
}

export const _SignupService = DefineService("sign-up-service", new SigunUpService())