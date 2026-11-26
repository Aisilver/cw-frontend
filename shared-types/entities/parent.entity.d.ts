import { Account } from "./account.entity";
import { EntityBase } from "./common";
import { Student } from "./student.entity";

export interface Parent <TID = string> extends EntityBase<TID> {
    children?: Student[]

    account?: Account;
    accountId: TID;
}