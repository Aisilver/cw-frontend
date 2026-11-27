import { Account } from "../../entities";

export type SigninResponseData = {
    auth_key: string;
    account: Account;
}