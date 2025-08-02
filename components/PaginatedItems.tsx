import Pagination from "@/assets/ts/models/Pagination";
import PaginationWrapper from "@/components/PaginationWrapper";
import React, {useMemo} from "react";

type Props = {
    pagination: Pagination,
    loading: boolean,
    onPage?: (pageNumber: any) => void,
    onPerPage?: (pageNumber: any) => void,
    perPage?: any,
    children?: React.ReactNode,
}

export default function PaginatedItems(props: Props) {

    const items = useMemo<Array<any>>(() => props.pagination.getData(), [props.pagination]);

    return <div className="flex flex-col gap-8">
        <PaginationWrapper pagination={props.pagination} onPage={props.onPage} onPerPage={props.onPerPage}
                           perPage={props.perPage}/>
        {
            props.loading ? <div className="h-56 w-full bg-gray-600 rounded-md animate-pulse"/>
                : items.length > 0
                    ? props.children
                    : <span>No Items Found</span>
        }
        <PaginationWrapper pagination={props.pagination} onPage={props.onPage} onPerPage={props.onPerPage}
                           perPage={props.perPage}/>
    </div>
}