import { Account } from "./account.entity";
import { EntityBase } from "./common";
import { Product } from "./product.entity";

export interface Teacher <TID = string> extends EntityBase<TID> {
    lesson?: Product;
    lessonId?: TID;
    
    account?: Account;
    accountId?: TID;
}