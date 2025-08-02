import {useMemo} from "react";
import RadioOption from "@/components/io/radio/RadioOption";

type Props = {
    selected?: any,
    name: string,
    label?: string;
    hideDetails?: boolean;
    errorMessages?: Array<string>;
    itemValueKey?: string
    itemTextKey?: string
    items?: Array<any>
    theme?: string,
    setValue?: (value: any) => void
}

export default function RadioButton(
    {
        selected = null,
        name,
        label = '',
        hideDetails = false,
        errorMessages = [],
        itemValueKey = 'value',
        itemTextKey = 'text',
        items = [],
        theme = '',
        setValue = (value: any) => {
        }
    }: Props
) {

    const firstMessage = useMemo(() => errorMessages, [errorMessages]);
    const titleStyle = useMemo(() => {
        switch (theme) {
            case 'blurry':
                return 'text-white'
            default:
                return 'text-black'
        }
    }, [theme]);

    return <div className="p-0 border-0">
        <div className="flex flex-col gap-2">
            {label && <div className={titleStyle}>
                {label}
            </div>}
            <div className="flex items-center gap-3">
                {
                    items.map((item, i) =>
                        <RadioOption selected={selected} name={name} setValue={setValue} key={i} option={item}
                                     itemValueKey={itemValueKey} itemTextKey={itemTextKey}/>
                    )
                }
            </div>
        </div>
        {!hideDetails && <div className="text-red-400 h-5 text-xs mt-0.5"> {firstMessage}</div>}
    </div>
}