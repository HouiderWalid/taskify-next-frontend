export const getType = (v: any) => Object.prototype.toString.call(v).slice(8, -1)
export const isObject = (v: any) => getType(v) === 'Object'
export const isString = (v: any) => getType(v) === 'String'
export const isArray = (v: any) => getType(v) === 'Array'
export const isFunction = (v: any) => ['AsyncFunction', 'Function'].includes(getType(v))

function objectStringifier(_key: string, object: any, fieldContentResolver: any) {

    type InitObject = {
        [key: string]: any
    }

    if (isObject(object)) {

        if (object.hasOwnProperty('fieldName')) {
            return {
                [object.fieldName]: fieldContentResolver(object)
            }
        }

        return Object.keys(object)
            .filter(subKey => isObject(object[subKey]) && object[subKey].hasOwnProperty('fieldName'))
            .reduce((init: InitObject, nextKey) => {
                init[object[nextKey].fieldName] = fieldContentResolver(object[nextKey])
                return init
            }, {})
    }

    return object
}

export function apiRequestStringifier(key: string, object: any) {
    return objectStringifier(
        key,
        object,
        (field: any) => isFunction(field.customContent)
            ? field.customContent()
            : isFunction(field.apiCustomContent)
                ? field.apiCustomContent()
                : Array.isArray(field.content)
                    ? field.content.map((item: any) => item.getId ? item.getId() : item)
                    : field.content?.getId
                        ? field.content.getId()
                        : field.content ?? null
    )
}