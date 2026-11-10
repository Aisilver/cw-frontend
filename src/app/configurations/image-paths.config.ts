import { AssetsPathBuilder } from "../functions/asset-path-builder.func";

export const APP_IMAGE_PATHs_CONFIGURATIONS = {
    LOGO: AssetsPathBuilder({name: "logo", ext: "png"}),
    
    CONNECTION_LOST: AssetsPathBuilder({folder: "images", name: "undraw_connection-lost_am29", ext: "svg"}),

    USER_ICON: AssetsPathBuilder({folder: "images", name: "user-icon", ext: "png"}),

    NO_IMAGE: AssetsPathBuilder({folder: "images", name: "no-image", ext: "png"}),

    SIGN_UP_PARENT_IMAGE: AssetsPathBuilder({folder: "images", name: "undraw_quality-time_ay6x", ext: "svg"}),

    SIGN_UP_STUDENT_IMAGE: AssetsPathBuilder({folder: "images", name: "undraw_mathematics_0j2b", ext: "svg"}),

    SIGN_UP_TEACHER_IMAGE: AssetsPathBuilder({folder: "images", name: "undraw_professor_d7zn", ext: "svg"})
}