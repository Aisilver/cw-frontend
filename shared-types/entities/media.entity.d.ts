import { EntityBase } from "./common";

export type AcceptedFileExtTypes = "jpg" | "jpeg" | "png"

export interface Media extends EntityBase {
    name: string,
    size: number,
    ext: AcceptedFileExtTypes
}