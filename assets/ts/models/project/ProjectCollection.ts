import JsonArrayMapper from "assets/ts/helpers/JsonArrayMapper";
import Project from "assets/ts/models/project/Project";

export default class ProjectCollection extends JsonArrayMapper<Project> {
    constructor(data: any) {
        super(data, Project);
    }
}