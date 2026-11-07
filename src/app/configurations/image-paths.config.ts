import { AssetsPathBuilder } from "../functions/asset-path-builder.func";

export const APP_IMAGE_PATHs_CONFIGURATIONS = {
    LOGO: AssetsPathBuilder({name: "logo", ext: "png"}),
    
    CONNECTION_LOST: AssetsPathBuilder({folder: "image", name: "undraw_connection-lost_am29", ext: "svg"}),

    USER_ICON: AssetsPathBuilder({folder: "image", name: "user-icon", ext: "png"}),

    NO_IMAGE: AssetsPathBuilder({folder: "image", name: "no-image", ext: "png"})
}