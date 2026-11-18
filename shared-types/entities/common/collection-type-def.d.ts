import { Account, Admin, Parent, Student, Teacher, User } from "..";

export type CollectionTypeDefinition = {
    users: User,
    
    teachers: Teacher;

    account: Account;
    
    lessons: any;

    parents: Parent;

    admins: Admin;

    students: Student;   

    enrollments: any;
}