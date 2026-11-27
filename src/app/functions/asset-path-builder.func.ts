type Options = {
    name: string;
    ext: "svg" | "webp" | "png" | "jpg" | "jpeg";
    folder?: "images"
}

export function AssetsPathBuilder (opts: Options) {
    const {name, ext, folder} = opts
    
    if(folder) 
        return `/${folder}/${name}.${ext}`
    else
        return `/${name}.${ext}`
}