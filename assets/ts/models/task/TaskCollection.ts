import JsonArrayMapper from "assets/ts/helpers/JsonArrayMapper";
import Task from "assets/ts/models/task/Task";

export default class TaskCollection extends JsonArrayMapper<Task>  {
    constructor(data: any) {
        super(data, Task);
    }
}