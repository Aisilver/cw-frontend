import { Account } from "./account.entity";
import { EntityBase } from "./common";
import { Enrollment } from "./enrolment.entity";
import { Parent } from "./parent.entity";

export interface Student <TID = string> extends EntityBase<TID> {
    myLessons?: Enrollment[]

    account?: Account;
    accountId?: TID;

    parent?: Parent;
    parentId?: TID;
}