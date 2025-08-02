import JsonMapper from "@/assets/ts/helpers/JsonMapper";
import User from "@/assets/ts/models/User";

export default class AuthData extends JsonMapper {

    static token_attribute_name = 'token'
    static user_attribute_name = 'user'

    #attributes = {
        [AuthData.token_attribute_name]: null,
        [AuthData.user_attribute_name]: User,
    }

    constructor(data: any) {
        super();
        this.map(data, this.#attributes)
    }

    static getAccessTokenAttributeName() {
        return this.token_attribute_name
    }

    static getUserAttributeName() {
        return this.user_attribute_name
    }

    getAccessToken() {
        return this.getAttribute(AuthData.getAccessTokenAttributeName())
    }

    getUser() {
        return this.getAttribute(AuthData.getUserAttributeName())
    }
}