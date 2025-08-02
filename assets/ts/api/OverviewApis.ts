import type {ApiData} from "~/composables/useFetchData";

export const useProjectsCountApi = (): ApiData => {
    return {method: 'GET', uri: 'overview/projects_count'}
}

export const useLast7DaysTasksCountApi = (): ApiData => {
    return {method: 'GET', uri: 'overview/last_7days_tasks_count'}
}

export const useLast7DaysTasksDoneCountApi = (): ApiData => {
    return {method: 'GET', uri: 'overview/last_7days_tasks_done_count'}
}

export const useChartTasksCountApi = (): ApiData => {
    return {method: 'GET', uri: 'overview/chart_tasks_count'}
}

export const useChartTasksDoneCountApi = (): ApiData => {
    return {method: 'GET', uri: 'overview/chart_tasks_done_count'}
}