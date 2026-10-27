export function AssetsPathBuilder (assetType: "image", name: string, ext: "svg") {
    const folder = assetType == "image" ? "images" : "null"

    return `/${folder}/${name}.${ext}`
}