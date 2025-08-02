import {get, isObjectLike} from "lodash-es";
import React, {useMemo} from "react";
import ListItem from "@/components/ListItem";
import clsx from "clsx";

type Props = {
    selected: any,
    item: any,
    itemTextKey?: string,
    itemValueKey?: string,
    onClick?: (e: React.MouseEvent) => void,
}

export default function ListObjectItem(props: Props) {

    const itemText = useMemo(() => isObjectLike(props.item) ? get(props.item, props.itemTextKey ?? '') : props.item, [props.item, props.itemTextKey]);
    const itemValue = useMemo(() => isObjectLike(props.item) ? get(props.item, props.itemValueKey ?? '') : props.item, [props.item, props.itemValueKey]);
    const selectedValue = useMemo(() => isObjectLike(props.selected) ? get(props.selected, props.itemValueKey ?? '') : props.selected, [props.selected, props.itemValueKey]);

    return <ListItem onClick={props.onClick}
        className={clsx({'bg-primary-200': itemValue === selectedValue && (selectedValue || selectedValue === 0)})}>
        {itemText}
    </ListItem>
}