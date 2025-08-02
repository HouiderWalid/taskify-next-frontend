import JsonMappedModel from "../helpers/JsonMappedModel.ts";

export default class Role extends JsonMappedModel {

    static PERMISSIONS = {
        SIDE_BAR_OVERVIEW: {
            ID: '1'
        },
        SIDE_BAR_USERS: {
            ID: '6'
        }
    }

    static name_attribute_name = 'name'

    #attributes = {
        [Role.name_attribute_name]: null
    }

    constructor(data: any) {
        super(data);
        this.map(data, this.#attributes)
    }

    static getNameAttributeName() {
        return this.name_attribute_name;
    }
}