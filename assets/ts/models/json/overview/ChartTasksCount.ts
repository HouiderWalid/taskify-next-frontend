import JsonMapper from "assets/ts/helpers/JsonMapper";

export default class ChartTasksCount extends JsonMapper {

    static month_attribute_name = 'month'
    static tasks_count_attribute_name = 'tasks_count'

    #attributes = {
        [ChartTasksCount.month_attribute_name]: null,
        [ChartTasksCount.tasks_count_attribute_name]: null,
    }

    constructor(data: any) {
        super();
        this.map(data, this.#attributes)
    }

    static getMonthAttributeName() {
        return this.month_attribute_name
    }

    static getTasksCountAttributeName() {
        return this.tasks_count_attribute_name
    }

    getMonth() {
        return this.getAttribute(ChartTasksCount.getMonthAttributeName())
    }

    getTasksCount() {
        return this.getAttribute(ChartTasksCount.getTasksCountAttributeName())
    }
}