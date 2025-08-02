type Props = {
    value: any,
    title?: string,
}

export default function ProgressBar(props: Props) {

    return <div className="flex flex-col gap-3">
        <div className="flex justify-between">
            <span>{props.title}</span>
            <span>{props.value}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-primary-800 h-2.5 rounded-full"
                 style={{width: [props.value, '%'].join('')}}>
            </div>
        </div>
    </div>
}