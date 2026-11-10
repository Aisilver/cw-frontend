import { BehaviouralSubject } from "@/app/classes/subject-event/behavioural-subject-event.class";
import { APP_ENTITY_DUMMY_DATA } from "@/app/configurations/dummy-entity-data.config";
import { CopyOf } from "@/app/functions/copy-of.func";
import { DefineService } from "@/app/functions/define-service.func";
import type { Roles } from "@shared/common"; 
import type { SignUpStagesTypes } from "../types";

class SigunUpService {
    get NewUser () {
        return CopyOf(APP_ENTITY_DUMMY_DATA.USER)
    }

    Role = new BehaviouralSubject<Roles>("student")

    SignUpStage = new BehaviouralSubject<SignUpStagesTypes>("bio")
}

export const _SignupService = DefineService("sign-up-service", new SigunUpService())