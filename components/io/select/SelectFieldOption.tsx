import {get, isObjectLike} from "lodash-es";
import {useMemo} from "react";

type Props = {
    option: any,
    optionValueKey?: string,
    optionTextKey?: string,
}

export default function SelectFieldOption(
    {
        option,
        optionValueKey = 'value',
        optionTextKey = 'text',
    }: Props
) {

    const value = useMemo(() => isObjectLike(option) ? get(option, optionValueKey) : option, [option])
    const text = useMemo(() => isObjectLike(option) ? get(option, optionTextKey) : option, [option])

    return <option value={value}>
        {text}
    </option>
}