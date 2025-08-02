import JsonArrayMapper from "@/assets/ts/helpers/JsonArrayMapper";
import User from "@/assets/ts/models/User";

export default class UserCollection extends JsonArrayMapper<User> {
    constructor(data: any) {
        super(data, User);
    }
}