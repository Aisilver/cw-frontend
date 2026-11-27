import { Admin } from "./admin.entity";
import { EntityBase } from "./common";
import { Media } from "./media.entity";
import { Parent } from "./parent.entity";
import { Student } from "./student.entity";
import { Teacher } from "./teacher.entity";
import { User } from "./user.entity";

export type AccountTypes = "dependant" | "primary"

export interface Account<TID = string> extends EntityBase<TID> {
    type: AccountTypes;
    userName: string;
    password: string;

    user?: User;
    userId?: TID;
    
    admin?: Admin;
    adminId?: TID;

    teacher?: Teacher;
    teacherId?: TID;
    
    student?: Student;
    studentId?: TID;
    
    parent?: Parent
    parentId?: TID;
    
    profileImg?: Media;
    profileImgId?: TID;
}