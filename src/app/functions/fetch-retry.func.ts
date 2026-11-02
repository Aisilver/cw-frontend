type Option = {
    count?: number,
    timeout?: number
    delay(): void | Promise<void>
}

export async function fetchRetry<Response>(target: Promise <Response>, opts?: Option) {
    let response!: Response,

    count = opts?.count ?? 3

    while (!response) {
        try {
            response = await target
        } catch (error) {

            if(count <= 0) throw error

            if(opts?.delay) await opts.delay()

            count--
        }
    }

    return response
}