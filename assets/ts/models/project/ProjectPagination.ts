import ProjectCollection from "assets/ts/models/project/ProjectCollection";
import Pagination from "assets/ts/models/Pagination";

export default class ProjectPagination extends Pagination {

    #attributes = {
        [Pagination.data_attribute_name]: ProjectCollection
    }

    constructor(data: any) {
        super(data);
        this.map(data, this.#attributes)
    }
}