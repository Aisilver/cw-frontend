import { catchError, from, Observable, of, retry, type Head } from "rxjs";
import { DefineService } from "../functions/define-service.func";
import { _UserService } from "../main-services/user-service/user.service";
import { InjectService } from "../functions/inject-service.func";
import type { ApiResponse } from "@shared/common"
import { _ServerResponseDecryptionService } from "./response-decryptor.service";
import type { ServerCallBehavior } from "./types";

type CallMethods <Data = unknown> = {
    get(): Observable<ApiResponse<Data>>;

    post(body: object): Observable<ApiResponse<Data>>;

    put(body: object): Observable<ApiResponse<Data>>;

    delete(): Observable<ApiResponse<Data>>
}


class ServerCallService {
    private get Enviroment () {
        return import.meta.env
    }

    call<Data = unknown>(params: (string | number)[] | string = "", queries = {}, opt: ServerCallBehavior = {}): CallMethods <Data>{
        const url = this.urlFormatter(params, queries),

        headers = new Headers(),

        {
            doNotIncludeAccessToken
        } = opt

        headers.append("Content-type", "application/json; charset=utf-8")

        if(!doNotIncludeAccessToken) {
            const {AccessToken} = InjectService(_UserService)
        
            headers.append("Authorization", `Bearer ${AccessToken}`)
        }
            

        return {
            get: () => this.generateHttpObservable(url, "get", headers),

            post: (body: object) => this.generateHttpObservable(url, "post", headers, body),
            
            put: (body: object) => this.generateHttpObservable(url, "put", headers, body),
            
            delete: () => this.generateHttpObservable(url, "delete", headers),
        }
    }

    private generateHttpObservable <Data = undefined> (url: string, method: keyof CallMethods, headers: Headers, data?: any) {        
        return new Observable<ApiResponse<Data>>(obvs => {
            fetch(url, {
                headers,
                method,
                ...(data && {
                    body: JSON.stringify(data)
                })
            })

            .then(async response => {
                const serializedResponse = await this.serializeResponse(response)

                obvs.next(serializedResponse)

                obvs.complete()
            })

            .catch(err => obvs.error(err))
        })

        .pipe(catchError(err => {
            const errData: ApiResponse<any> = {
                state: "failed",
                message: err.message,
            }
            
            return of(errData)
        }))
    }

    private urlFormatter (params?: (string | number)[] | string, queries = {}): string {
        let queryStr

        const {VITE_BASE_API_URL} = this.Enviroment,

        urlstr = () => {
            if(!params) return `${VITE_BASE_API_URL}`
            
             return typeof params == "string" ? `${VITE_BASE_API_URL}/${params}` : [VITE_BASE_API_URL, ...params].join("/")
        }

        if(Object.entries(queries).length > 0) {
            queryStr = Object.entries(queries).map(query => {
                const [key, value] = query

                return `${key}=${value}`
            }).join("&")
        }

        if(queryStr)
            return `${urlstr()}?${queryStr}`

        else 
            return urlstr()
    }

    private async serializeResponse (response: Response) {
        const serverResponseDecryptor = InjectService(_ServerResponseDecryptionService),

        { headers } = response

        let serializedData: ApiResponse<any>

        try {

            if(headers.get("x-encrypted-data")) 
                serializedData = JSON.parse(await serverResponseDecryptor.decrypt(await response.json()))
            else 
                serializedData = await response.json()


        } catch (error: any) {
            serializedData = {
                state: "failed",
                message: error.message
            }
        }
        return serializedData
    }
}

export const _ServerCallService = DefineService("server-call-service", new ServerCallService())