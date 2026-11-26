import { EntityBase } from "./common";

export type ProductTypes = "lesson" | "activity"

export interface Product extends EntityBase {
    name: string;
    type: ProductTypes;
    price: number;
    description: string;
}