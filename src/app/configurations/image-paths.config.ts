import { AssetsPathBuilder } from "../functions/asset-path-builder.func";

export const APP_IMAGE_PATHs_CONFIGURATIONS = {
    LOGO: AssetsPathBuilder({name: "logo", ext: "png"}),
    
    CONNECTION_LOST: AssetsPathBuilder({folder: "image", name: "undraw_connection-lost_am29", ext: "svg"})
}