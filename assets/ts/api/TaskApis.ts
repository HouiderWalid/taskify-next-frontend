import type {ApiData} from "~/composables/useFetchData";

export const useCreateTaskApi = (data: any, query: object = {}): ApiData => {
    return {method: 'POST', uri: 'task', data, query}
}

export const useUpdateTaskApi = (taskId: any, data: any, query: object = {}): ApiData => {
    return {method: 'PUT', uri: 'task/' + taskId, data, query}
}

export const useDeleteTaskApi = (taskId: any, query: object = {}): ApiData => {
    return {method: 'DELETE', uri: 'task/' + taskId, query}
}

export const useFilteredTasksApi = (query: object = {}): ApiData => {
    return {method: 'GET', uri: 'task', query}
}

export const useFormProjectsApi = (): ApiData => {
    return {method: 'GET', uri: 'task/form/projects'}
}

export const useFormMembersApi = (): ApiData => {
    return {method: 'GET', uri: 'task/form/members'}
}