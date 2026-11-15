import { BehaviouralSubject } from "@/app/classes/subject-event/behavioural-subject-event.class";
import { APP_ENTITY_DUMMY_DATA } from "@/app/configurations/dummy-entity-data.config";
import { CopyOf } from "@/app/functions/copy-of.func";
import { DefineService } from "@/app/functions/define-service.func";
import type { Roles } from "@shared/common"; 
import type { SignUpStagesTypes } from "../types";
import type { Account, User } from "@shared/entities";

class SigunUpService {
    private declare user: User

    private declare account: Account

    getNewUserObject () {
        return CopyOf(APP_ENTITY_DUMMY_DATA.USER)
    }

    Role = new BehaviouralSubject<Roles>("student")

    SignUpStage = new BehaviouralSubject<SignUpStagesTypes>("bio")

    setUser(user: User) {
        this.user = user
    }

    setAccount(acct: Account) {
        this.account = acct
    }
}

export const _SignupService = DefineService("sign-up-service", new SigunUpService())