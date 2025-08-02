import Pagination from "assets/ts/models/Pagination";
import TaskCollection from "assets/ts/models/task/TaskCollection";

export default class TaskPagination extends Pagination {

    #attributes = {
        [Pagination.data_attribute_name]: TaskCollection
    }

    constructor(data: any) {
        super(data);
        this.map(data, this.#attributes)
    }
}