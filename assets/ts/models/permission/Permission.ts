import JsonMappedModel from "assets/ts/helpers/JsonMappedModel";

export default class Permission extends JsonMappedModel {

    static VIEW_OVERVIEW = 'view-overview';
    static VIEW_PROJECTS = 'view-projects';
    static CREATE_PROJECT = 'create-project';
    static UPDATE_PROJECT = 'update-project';
    static DELETE_PROJECT = 'delete-project';
    static VIEW_TASKS = 'view-tasks';
    static CREATE_TASK = 'create-task';
    static UPDATE_TASK = 'update-task';
    static DELETE_TASK = 'delete-task';
    static UPDATE_TASK_STATUS = 'update-task-status';
    static VIEW_USERS = 'view-users';
    static CREATE_USER = 'create-user';
    static UPDATE_USER = 'update-user';
    static VIEW_CHAT = 'view-chat';
    static VIEW_SETTINGS = 'view-settings';
    static UPDATE_SETTINGS = 'update-settings';

    static name_attribute_name = 'name';

    #attributes = {
        [Permission.name_attribute_name]: null
    }

    constructor(data: any) {
        super(data);
        this.map(data, this.#attributes)
    }

    static getNameAttributeName() {
        return this.name_attribute_name;
    }

    getName() {
        return this.getAttribute(Permission.getNameAttributeName())
    }
}