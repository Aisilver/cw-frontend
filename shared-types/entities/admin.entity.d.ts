import { Account } from ".";
import { EntityBase } from "./common";

export interface Admin <TID = string> extends EntityBase<TID> {
    accountId: TID;
    account?: Account
}