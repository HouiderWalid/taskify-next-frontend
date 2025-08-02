import JsonMapper from "assets/ts/helpers/JsonMapper";

export default class Response extends JsonMapper {

    static code_attribute_name = 'code'
    static data_attribute_name = 'data'
    static messages_attribute_name = 'messages'

    #attributes = {
        [Response.code_attribute_name]: null,
        [Response.data_attribute_name]: null,
        [Response.messages_attribute_name]: null,
    }

    constructor(data: any) {
        super()
        this.map(data, this.#attributes)
    }

    static getDataAttributeName() {
        return Response.data_attribute_name
    }

    getData() {
        return this.getAttribute(Response.getDataAttributeName())
    }
}