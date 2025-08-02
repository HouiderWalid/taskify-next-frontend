import JsonMapper from "@/assets/ts/helpers/JsonMapper";

export default class ApiResponse extends JsonMapper {

    static code_attribute_name = 'code'
    static data_attribute_name = 'data'
    static messages_attribute_name = 'messages'

    static ATTRIBUTES = {
        [this.code_attribute_name]: null,
        [this.data_attribute_name]: null,
        [this.messages_attribute_name]: null,
    }

    constructor(data: any) {
        super()
        this.map(data, ApiResponse.ATTRIBUTES)
    }

    static getDataAttributeName() {
        return ApiResponse.data_attribute_name
    }

    getResponseData() {
        return this.getAttribute(ApiResponse.getDataAttributeName())
    }

    getData() {
        return this.getAttribute(ApiResponse.getDataAttributeName())
    }
}