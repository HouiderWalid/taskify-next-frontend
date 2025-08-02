import Spinner from "@/components/Spinner";
import React, {useMemo} from "react";
import Chart from "react-apexcharts";
import ChartTasksCount from "@/assets/ts/models/json/overview/ChartTasksCount";
import {ApexOptions} from "apexcharts";

type Props = {
    loading: boolean;
    title?: React.ReactNode;
    data?: any;
    name: any
}

export default function ProjectCard(props: Props) {

    function getPrimaryColor(variant = '600') {
        // This works in browser environment
        return getComputedStyle(document.documentElement)
            .getPropertyValue(`--color-primary-${variant}`).trim();
    }

    const categories = useMemo(() => Array.isArray(props.data) ? props.data.map((chartTaskCount: ChartTasksCount) => chartTaskCount.getMonth()) : [], [props.data]);
    const data = useMemo(() => Array.isArray(props.data) ? props.data.map((chartTaskCount: ChartTasksCount) => chartTaskCount.getTasksCount()) : [], [props.data]);

    const options: ApexOptions = useMemo(() => ({
        stroke: {
            curve: 'smooth',
            colors: [getPrimaryColor()]
        },
        chart: {
            toolbar: {
                show: false // This hides the entire toolbar including menu
            }
        },
        xaxis: {
            categories: categories
        }
    }), [JSON.stringify(categories)]);

    const series = useMemo(() => ([{
        name: props.name,
        data: data
    }]), [props.name, data])

    return <div className="pe-2 pt-2 w-full border bg-white shadow-sm rounded-xl border-gray-200">
    <span className="text-xl pt-4 ps-4">
      {props.title}
    </span>
        {
            props.loading && <div className="w-full h-[266px] flex justify-center items-center">
                <Spinner/>
            </div>
        }
        {options.xaxis?.categories.length > 0 && <Chart options={options} series={series} width="100%" style={{height: '100%'}} type="line"/>}
    </div>
}