import JsonMappedModel from "@/assets/ts/helpers/JsonMappedModel";
import PermissionCollection from "@/assets/ts/models/permission/PermissionCollection";
import Permission from "@/assets/ts/models/permission/Permission";

export default class User extends JsonMappedModel {

    static full_name_attribute_name = 'full_name'
    static email_attribute_name = 'email'
    static email_verified_attribute_name = 'email_verified'
    static permissions_attribute_name = 'permissions'

    #attributes = {
        [User.full_name_attribute_name]: null,
        [User.email_attribute_name]: null,
        [User.email_verified_attribute_name]: false,
        [User.permissions_attribute_name]: PermissionCollection
    }

    constructor(data: any) {
        super(data);
        this.map(data, this.#attributes)
    }

    static getFullNameAttributeName() {
        return this.full_name_attribute_name;
    }

    static getPermissionsAttributeName() {
        return this.permissions_attribute_name
    }

    getId(){
        return this.getAttribute(User.getIdAttributeName())
    }

    getFullName() {
        return this.getAttribute(User.getFullNameAttributeName());
    }

    getPermissions() {
        return this.getAttribute(User.getPermissionsAttributeName())
    }

    isPermitted(permission: string) {
        const permissions = this.getPermissions()
        return Array.isArray(permissions) && permissions.some((userPermission: Permission) => userPermission.getName() === permission)
    }
}