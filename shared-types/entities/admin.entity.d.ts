import { Account } from ".";
import { EntityBase } from "./common";

export interface Admin extends EntityBase {
    accountId: string;
    account?: Account
}