import JsonMapper from "@/assets/ts/helpers/JsonMapper";
import axios, {AxiosHeaders, AxiosRequestConfig, type AxiosResponse, type RawAxiosRequestHeaders} from "axios";
import ApiResponse from "@/assets/ts/models/ApiResponse";
import {store} from "@/store/store";
import {NextRequest} from "next/server";
import {getToken} from "@/store/userStore";
import {snakeCase} from "@/assets/ts/helpers/helpers";

export type ApiData = {
    data?: JsonObject,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    uri: string,
    query?: object,
    baseURL?: string,
    model?: any,
    request?: NextRequest,
}

type JsonObject = {
    [key: string]: any
}

export function useSyncFetchData<ResponseType extends typeof JsonMapper>(
    {
        data = {},
        method = 'GET',
        uri,
        query = {},
        baseURL = process.env.NEXT_PUBLIC_API_URL,
        request
    }: ApiData
): CustomRequestBody<ResponseType> {

    const endPoint = [baseURL, uri].join('')
    let changedData = Object.keys(data).reduce((init: JsonObject, next: string) => {
        init[snakeCase(next)] = data[next]
        return init
    }, {})
    let headers: RawAxiosRequestHeaders | AxiosHeaders = {}

    const token = getToken(store.getState(), request)

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    let axiosConfig: AxiosRequestConfig = {
        method,
        url: endPoint,
        headers,
        params: {
            ...query,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
    }

    if (method !== 'GET') {
        axiosConfig.data = changedData
    }

    return new CustomRequestBody<ResponseType>(axios(axiosConfig))
}

class CustomRequestBody<ResponseType extends typeof JsonMapper> {

    #request: Promise<ResponseType>

    constructor(request: Promise<ResponseType>) {
        this.#request = request
    }

    onStart = (callBack: Function) => {

        callBack()

        return this
    }

    onValidationErrors = (callBack: Function) => {

        this.#request.then((response: any) => {
            const responseCode = response.data.code
            if (responseCode === 401) {
                callBack(response.data.messages?.errors ?? [])
            }
        })

        return this
    }

    onSuccess = (callBack: Function, Model?: any) => {

        this.#request.then((response: any) => {
            const responseCode = response.data.code
            const responseMessage = response.data.messages
            if (!responseCode) {
                return Model ? new Model(response) : new ApiResponse(response.data)
            } else if (responseCode > 199 && responseCode < 299) {
                callBack(Model ? new Model(response.data.data) : new ApiResponse(response.data), responseMessage)
            }
        })

        return this
    }

    onFailure = (callBack: Function) => {

        this.#request.then((response: any) => {
            const responseCode = response.data.code
            const responseMessage = response.data.messages
            if (responseCode === 404 || responseCode === 500) {
                callBack(responseMessage)
            }
        }).catch(error => callBack(error?.message))

        return this
    }

    onFinished = (callBack: Function) => {

        this.#request.then(() => callBack()).catch(() => callBack())

        return this
    }
}

export function useFetchedData<ResponseType extends typeof JsonMapper>(
    {
        data = {},
        method = 'GET',
        uri,
        query = {},
        baseURL = process.env.NEXT_PUBLIC_API_URL,
        model,
        request
    }: ApiData,
): Promise<{ data: ResponseType, message?: null }> {

    const endPoint = [baseURL, uri].join('')
    let changedData = Object.keys(data).reduce((init: JsonObject, next: string) => {
        init[snakeCase(next)] = data[next]
        return init
    }, {})
    let headers: RawAxiosRequestHeaders | AxiosHeaders = {}

    const token = getToken(store.getState(), request)

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    let axiosConfig: AxiosRequestConfig = {
        method,
        url: endPoint,
        headers,
        params: {
            ...query,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
    }

    if (method !== 'GET') {
        axiosConfig.data = changedData
    }

    const axiosRequest = axios(axiosConfig)
    return new Promise<{ data: ResponseType, message?: null }>((resolve, reject) => {
        axiosRequest.then((response: AxiosResponse<any, any>) => {
            const responseCode = response.data.code
            const responseData = response.data.data
            const responseMessage = response.data.messages

            console.log('async request response', response.data)

            if (!responseCode) {
                return resolve({data: model ? new model(response) : response})
            } else if (responseCode > 199 && responseCode < 299) {
                return resolve({
                    data: model ? new model(responseData) : new ApiResponse(response),
                    message: responseMessage
                })
            }

            reject(responseMessage)
        }).catch(error => {
            reject(error)
        })
    })
}