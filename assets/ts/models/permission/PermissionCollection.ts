import JsonArrayMapper from "assets/ts/helpers/JsonArrayMapper";
import Permission from "assets/ts/models/permission/Permission";

export default class PermissionCollection extends JsonArrayMapper<Permission> {
    constructor(items: Array<any>) {
        super(items, Permission);
    }
}