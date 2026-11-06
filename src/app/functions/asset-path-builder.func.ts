type Options = {
    name: string;
    ext: "svg" | "webp" | "png";
    folder?: "image"
}

export function AssetsPathBuilder (opts: Options) {
    const {name, ext, folder} = opts
    
    if(folder) 
        return `/${folder}/${name}.${ext}`
    else
        return `/${name}.${ext}`
}