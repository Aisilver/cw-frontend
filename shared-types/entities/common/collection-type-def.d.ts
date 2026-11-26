import { Account, Admin, Enrollment, Media, Parent, Product, Student, Teacher, User } from "..";

export type CollectionTypeDefinition = {
    users: User,
    
    accounts: Account;

    teachers: Teacher;

    parents: Parent;

    admins: Admin;

    students: Student;   

    medias: Media;

    lessons: Product;

    enrollments: Enrollment;
}