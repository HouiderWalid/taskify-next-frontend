import type {ApiData} from "~/composables/useFetchData";

export const useCreateProjectApi = (data: any, query: object = {}): ApiData => {
    return {method: 'POST', uri: 'project', data, query}
}

export const useUpdateProjectApi = (projectId: any, data: any, query: object = {}): ApiData => {
    return {method: 'PUT', uri: 'project/' + projectId, data, query}
}

export const useDeleteProjectApi = (projectId: any, query: object = {}): ApiData => {
    return {method: 'DELETE', uri: 'project/' + projectId, query}
}

export const useFilteredProjectsApi = (query: object = {}): ApiData => {
    return {method: 'GET', uri: 'project', query}
}