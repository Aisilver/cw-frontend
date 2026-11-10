export function CopyOf<Copy>(source: Copy): Copy {
    return JSON.parse(JSON.stringify(source))
}