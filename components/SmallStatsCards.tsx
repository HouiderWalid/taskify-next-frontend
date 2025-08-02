'use client'

import SmallStatCard from "@/components/overview/SmallStatCard";
import {mdiFolder} from "@mdi/js";
import {useEffect, useState} from "react";
import {useSyncFetchData} from "@/composables/useFetchedData";
import {
    useLast7DaysTasksCountApi,
    useLast7DaysTasksDoneCountApi,
    useProjectsCountApi
} from "@/assets/ts/api/OverviewApis";
import ApiResponse from "@/assets/ts/models/ApiResponse";
import {useClientLocale} from "@/composables/useServerLocale";

export default function SmallStatsCards() {

    const [projectCountLoading, setProjectCountLoading] = useState<boolean>(false);
    const [projectCount, setProjectCount] = useState(0);

    const [last7DaysTasksCountLoading, setLast7DaysTasksCountLoading] = useState<boolean>(false);
    const [last7DaysTasks, setLast7DaysTasksCount] = useState(0);

    const [last7DaysTasksDoneCountLoading, setLast7DaysTasksDoneCountLoading] = useState<boolean>(false);
    const [last7DaysTasksDone, setLast7DaysTasksDoneCount] = useState(0);

    function getProjectsCount() {
        useSyncFetchData(useProjectsCountApi())
            .onStart(() => setProjectCountLoading(true))
            .onSuccess((response: ApiResponse) => setProjectCount(response.getData()))
            .onFinished(() => setProjectCountLoading(false))
    }

    function getLast7DaysTasksCount() {
        useSyncFetchData(useLast7DaysTasksCountApi())
            .onStart(() => setLast7DaysTasksCountLoading(true))
            .onSuccess((response: ApiResponse) => setLast7DaysTasksCount(response.getData()))
            .onFinished(() => setLast7DaysTasksCountLoading(false))
    }

    function getLast7DaysTasksDoneCount() {
        useSyncFetchData(useLast7DaysTasksDoneCountApi())
            .onStart(() => setLast7DaysTasksDoneCountLoading(true))
            .onSuccess((response: ApiResponse) => setLast7DaysTasksDoneCount(response.getData()))
            .onFinished(() => setLast7DaysTasksDoneCountLoading(false))
    }

    const {t} = useClientLocale()

    useEffect(() => {
        getProjectsCount()
        getLast7DaysTasksCount()
        getLast7DaysTasksDoneCount()
    }, [])

    return <>
        <SmallStatCard className="grow basis-[200px]" text={t('overview.smallCards.projects.title')}
                       value={projectCount} loading={projectCountLoading}
                       time={t('overview.smallCards.projects.time')} icon={mdiFolder}/>
        <SmallStatCard className="grow basis-[200px]" text={t('overview.smallCards.tasks.title')}
                       value={last7DaysTasks} loading={last7DaysTasksCountLoading}
                       time={t('overview.smallCards.tasks.time')} icon={mdiFolder}/>
        <SmallStatCard className="grow basis-[200px]" text={t('overview.smallCards.doneTasks.title')}
                       value={last7DaysTasksDone} loading={last7DaysTasksDoneCountLoading}
                       time={t('overview.smallCards.doneTasks.time')} icon={mdiFolder}/>
    </>
}