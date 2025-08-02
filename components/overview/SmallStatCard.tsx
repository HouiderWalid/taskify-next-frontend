import Spinner from "@/components/Spinner";
import Icon from "@mdi/react";
import {mdiClockTimeEight} from "@mdi/js";
import clsx from "clsx";

type Props = {
    value: any,
    icon: any,
    time: string,
    text: string,
    loading: boolean,
    className?: string,
}

export default function SmallStatCard(props: Props) {

    return <div className={clsx("flex flex-col gap-8 p-2 border bg-white shadow-sm rounded-xl border-gray-200", props.className)}>
        <div className="flex justify-between text-primary-700">
            <Icon path={props.icon} size={1}/>
            <div className="flex flex-col items-end">
                <span className="text-xs">{props.text}</span>
                <div className="text-3xl font-bold">
                  {props.loading ? <Spinner className="p-2" size="20"/> : <span>{props.value}</span>}
                </div>
            </div>
        </div>
        <span className="flex gap-2 pt-1 items-center border border-0 border-t-2 border-t-gray-300 text-gray-500">
      <Icon path={mdiClockTimeEight} size={.7}/>
      <span className="text-xs">{props.time}</span>
    </span>
    </div>
}