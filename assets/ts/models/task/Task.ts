import JsonMappedModel from "assets/ts/helpers/JsonMappedModel";
import User from "assets/ts/models/user/User";
import Project from "assets/ts/models/project/Project";

export default class Task extends JsonMappedModel {

    static LOW_PRIORITY = 'low';
    static MEDIUM_PRIORITY = 'medium';
    static HIGH_PRIORITY = 'high';

    static TODO_STATUS = 'todo';
    static IN_PROGRESS_STATUS = 'in_progress';
    static DONE_STATUS = 'done';

    static assigned_to_user_attribute_name = 'assigned_to_user';
    static title_attribute_name = 'title';
    static description_attribute_name = 'description';
    static status_attribute_name = 'status';
    static due_date_attribute_name = 'due_date';
    static project_attribute_name = 'project';
    static priority_attribute_name = 'priority';

    #attributes = {
        [Task.assigned_to_user_attribute_name]: User,
        [Task.title_attribute_name]: null,
        [Task.description_attribute_name]: null,
        [Task.status_attribute_name]: Task.TODO_STATUS,
        [Task.priority_attribute_name]: Task.LOW_PRIORITY,
        [Task.due_date_attribute_name]: null,
        [Task.project_attribute_name]: Project,
    }

    constructor(data: any) {
        super(data);
        this.map(data, this.#attributes)
    }

    static getTitleAttributeName() {
        return this.title_attribute_name
    }

    static getDescriptionAttributeName() {
        return this.description_attribute_name
    }

    static getProjectAttributeName() {
        return this.project_attribute_name
    }

    static getDueDateAttributeName() {
        return this.due_date_attribute_name
    }

    static getStatusAttributeName() {
        return this.status_attribute_name
    }

    static getPriorityAttributeName() {
        return this.priority_attribute_name
    }

    static getAssignedToUserAttributeName() {
        return this.assigned_to_user_attribute_name
    }

    getTitle() {
        return this.getAttribute(Task.title_attribute_name);
    }

    getDescription() {
        return this.getAttribute(Task.getDescriptionAttributeName());
    }

    getDueDate() {
        return this.getAttribute(Task.getDueDateAttributeName());
    }

    getAssignedToUser() {
        return this.getAttribute(Task.getAssignedToUserAttributeName());
    }

    getProject() {
        return this.getAttribute(Task.getProjectAttributeName());
    }

    getPriority() {
        return this.getAttribute(Task.getPriorityAttributeName());
    }

    getStatus() {
        return this.getAttribute(Task.getStatusAttributeName());
    }
}