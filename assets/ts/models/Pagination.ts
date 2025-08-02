import JsonMapper from "assets/ts/helpers/JsonMapper";

export default class Pagination extends JsonMapper {

    static current_page_attribute_name = 'current_page'
    static data_attribute_name = 'data'
    static per_page_attribute_name = 'per_page'
    static total_attribute_name = 'total'

    #attributes = {
        [Pagination.current_page_attribute_name]: 1,
        [Pagination.data_attribute_name]: [],
        [Pagination.per_page_attribute_name]: 5,
        [Pagination.total_attribute_name]: 0,
    }

    constructor(data?: any) {
        super();
        this.map(data, this.#attributes)
    }

    static getCurrentPageAttributeName() {
        return Pagination.current_page_attribute_name
    }

    static getPerPageAttributeName() {
        return Pagination.per_page_attribute_name
    }

    static getDataAttributeName() {
        return Pagination.data_attribute_name
    }

    static getTotalAttributeName() {
        return Pagination.total_attribute_name
    }

    getCurrentPage() {
        return this.getAttribute(Pagination.getCurrentPageAttributeName()) ?? 1
    }

    getTotalItems() {
        return this.getAttribute(Pagination.getTotalAttributeName()) ?? 0
    }

    getPerPage() {
        return this.getAttribute(Pagination.getPerPageAttributeName()) ?? 5
    }

    getTotalPages() {
        return Math.ceil(this.getTotalItems() / this.getPerPage())
    }

    getData() {
        return this.getAttribute(Pagination.getDataAttributeName()) ?? []
    }

    setPerPage(perPage: number) {
        this.setAttribute(Pagination.getPerPageAttributeName(), perPage)
        return this
    }

    setCurrentPage(page: number) {
        this.setAttribute(Pagination.getCurrentPageAttributeName(), page)
        return this
    }
}