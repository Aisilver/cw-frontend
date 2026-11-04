type Option = {
    count?: number,
    timeout?: number
    delay(err: any, retryCount: number): Promise<{continueRetry: boolean}> | {continueRetry: boolean}
}

export async function fetchRetry<Response>(target: Promise <Response>, opts?: Option) {
    let response!: Response,

    count = opts?.count ?? 3,

    timeout = opts?.timeout ?? 0

    while (!response) {

            try {
                response = await new Promise ((res, rej) => {
                    let timeoutId!: number

                    if(timeout)
                        timeoutId = setTimeout(() => rej(), timeout)

                    target.then(data => res(data))

                    .catch(err => rej(err))

                    .finally(() => clearTimeout(timeoutId))
                })

            } catch (error) {

                if(count <= 0) throw error

                if(opts?.delay) {
                    const {continueRetry} = await opts.delay(error, count)

                    if(!continueRetry) throw error
                }

                count--
            }
        }

    return response
}