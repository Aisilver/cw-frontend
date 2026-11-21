export async function Delay (timeDelay = 0) {
    return new Promise<void>((res) => setTimeout(() => res(), timeDelay))
}