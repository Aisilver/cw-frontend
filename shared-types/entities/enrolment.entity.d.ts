import { EntityBase } from "./common";

export interface Enrollment <TID = string> extends EntityBase<TID> {
    studentId: TID;

    productId: TID;
}