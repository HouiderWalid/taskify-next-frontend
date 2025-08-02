import JsonMappedModel from "assets/ts/helpers/JsonMappedModel";
import TaskCollection from "assets/ts/models/task/TaskCollection";

export default class Project extends JsonMappedModel {

    static name_attribute_name = 'name'
    static description_attribute_name = 'description'
    static due_date_attribute_name = 'due_date'
    static tasks_attribute_name = 'tasks'
    static tasks_done_count_attribute_name = 'tasks_done_count'
    static tasks_count_attribute_name = 'tasks_count'
    static task_assigned_members_count_attribute_name = 'task_assigned_members_count'

    #attributes = {
        [Project.name_attribute_name]: null,
        [Project.description_attribute_name]: null,
        [Project.due_date_attribute_name]: null,
        [Project.tasks_attribute_name]: TaskCollection,
        [Project.tasks_done_count_attribute_name]: 0,
        [Project.tasks_count_attribute_name]: 0,
        [Project.task_assigned_members_count_attribute_name]: 0,
    }

    constructor(data: any) {
        super(data);
        this.map(data, this.#attributes)
    }

    static getNameAttributeName() {
        return this.name_attribute_name
    }

    static getDescriptionAttributeName() {
        return this.description_attribute_name
    }

    static getDueDateAttributeName() {
        return this.due_date_attribute_name
    }

    static getTasksDoneCountAttributeName() {
        return this.tasks_done_count_attribute_name
    }

    static getTasksCountAttributeName() {
        return this.tasks_count_attribute_name
    }

    static getTasksAssignedMembersCountAttributeName() {
        return this.task_assigned_members_count_attribute_name
    }

    getName() {
        return this.getAttribute(Project.getNameAttributeName())
    }

    getDescription() {
        return this.getAttribute(Project.getDescriptionAttributeName())
    }

    getDueDate() {
        return this.getAttribute(Project.getDueDateAttributeName())
    }

    getTasksDoneCount() {
        return this.getAttribute(Project.getTasksDoneCountAttributeName()) ?? 0
    }

    getTasksCount() {
        return this.getAttribute(Project.getTasksCountAttributeName()) ?? 0
    }

    getTasksAssignedMembersCount() {
        return this.getAttribute(Project.getTasksAssignedMembersCountAttributeName()) ?? 0
    }
}