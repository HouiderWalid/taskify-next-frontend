import JsonMapper from "./JsonMapper.ts";
import JsonMapperModuleResolver from "./JsonMapperModuleResolver";

export default class JsonArrayMapper<T> extends Array<T> {
    constructor(items: any[], Model: any) {
        items = Array.isArray(items) ? items : []
        let list = items.map((item: any) => {

            let ItemModel = Model
            if (
                Model === JsonMapperModuleResolver ||
                JsonMapperModuleResolver.isPrototypeOf(Model)
            ) {
                ItemModel = Model.getResolvedModule(item)
            }

            return JsonMapper.isPrototypeOf(ItemModel) ? new ItemModel(item) : item
        })

        super(...list)
    }
}