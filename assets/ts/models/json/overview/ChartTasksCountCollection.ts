import JsonArrayMapper from "assets/ts/helpers/JsonArrayMapper";
import ChartTasksCount from "assets/ts/models/json/overview/ChartTasksCount";

export default class ChartTasksCountCollection extends JsonArrayMapper<ChartTasksCount> {
    constructor(data?: Array<any>) {
        super(data, ChartTasksCount);
    }
}