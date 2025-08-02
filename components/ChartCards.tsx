'use client'

import ChartCard from "@/components/ChartCard";
import {useEffect, useState} from "react";
import {useSyncFetchData} from "@/composables/useFetchedData";
import {useChartTasksCountApi, useChartTasksDoneCountApi} from "@/assets/ts/api/OverviewApis";
import ChartTasksCountCollection from "@/assets/ts/models/json/overview/ChartTasksCountCollection";
import {useClientLocale} from "@/composables/useServerLocale";

export default function ChartCards() {

    const [chartTasksCountLoading, setChartTasksCountLoading] = useState<boolean>(false);
    const [chartTasksCount, setChartTasksCount] = useState<Array<any>>([]);

    const [chartTasksDoneCountLoading, setChartTasksDoneCountLoading] = useState<boolean>(false);
    const [chartTasksDoneCount, setChartTasksDoneCount] = useState<Array<any>>([]);


    function getChartTasksCount() {
        useSyncFetchData(useChartTasksCountApi())
            .onStart(() => setChartTasksCountLoading(true))
            .onSuccess((chartTaskCountCollection: ChartTasksCountCollection) => setChartTasksCount(chartTaskCountCollection), ChartTasksCountCollection)
            .onFinished(() => setChartTasksCountLoading(false))
    }

    function getChartTasksDoneCount() {
        useSyncFetchData(useChartTasksDoneCountApi())
            .onStart(() => setChartTasksDoneCountLoading(true))
            .onSuccess((chartTaskCountCollection: ChartTasksCountCollection) => setChartTasksDoneCount(chartTaskCountCollection), ChartTasksCountCollection)
            .onFinished(() => setChartTasksDoneCountLoading(false))
    }

    const {t} = useClientLocale()

    useEffect(() => {
        getChartTasksCount()
        getChartTasksDoneCount()
    }, [])

    return <>
        <ChartCard data={chartTasksCount} loading={chartTasksCountLoading} name="Tasks"
                   title={t('overview.charts.tasksCount.title')}/>
        <ChartCard data={chartTasksDoneCount} loading={chartTasksDoneCountLoading} name="Tasks Done"
                   title={t('overview.charts.tasksCount.title')}/>
    </>
}