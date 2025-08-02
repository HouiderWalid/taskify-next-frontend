import {ApiData} from "@/composables/useFetchedData";
import User from "@/assets/ts/models/User";
import {NextRequest} from "next/server";

export const useSignUpApi = (data: any): ApiData => {
    return {method: 'POST', uri: 'sign_up', data}
}

export const useSignInApi = (data: any): ApiData => {
    return {method: 'POST', uri: 'sign_in', data}
}

export const useAuthUserApi = (request: NextRequest): ApiData => {
    return {method: 'GET', uri: 'auth_user', model: User, request}
}

export const useLogoutApi = (): ApiData => {
    return {method: 'PATCH', uri: 'logout'}
}