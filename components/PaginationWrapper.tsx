import Pagination from "@/assets/ts/models/Pagination";
import {useMemo} from "react";
import Button from "@/components/io/Button";
import SelectField from "@/components/io/select/SelectField";
import {mdiChevronLeft, mdiChevronRight} from "@mdi/js";

type Props = {
    pagination: Pagination,
    onPage?: (pageNumber: any) => void,
    onPerPage?: (pageNumber: any) => void,
    perPage?: any,
}

export default function PaginationWrapper(props: Props) {

    const currentPage = useMemo(() => props.pagination.getCurrentPage(), [props.pagination]);
    const totalPages = useMemo(() => props.pagination.getTotalPages(), [props.pagination]);
    const previousPageEnabled = useMemo(() => Number(currentPage) > 1, [props.pagination]);
    const nextPageEnabled = useMemo(() => Number(currentPage) < Number(totalPages), [props.pagination]);
    const pagesBeforeCurrent = useMemo(() => Array.from({length: 3}).map((item, i) => Number(currentPage) - (i + 1)).filter(page => page > 1).reverse(), [props.pagination]);
    const pagesAfterCurrent = useMemo(() => Array.from({length: 3}).map((item, i) => Number(currentPage) + (i + 1)).filter(page => page < Number(totalPages)), [props.pagination]);
    const hasPreviousDots = useMemo(() => Number(currentPage) - 4 > 1, [props.pagination]);
    const hasNextDots = useMemo(() => Number(currentPage) + 4 < Number(totalPages), [props.pagination]);
    const hasFirstPage = useMemo(() => Number(currentPage) !== 1 && Number(currentPage) > 1, [props.pagination])
    const hasLastPage = useMemo(() => Number(currentPage) !== Number(totalPages) && Number(currentPage) < Number(totalPages), [props.pagination]);
    const perPage = useMemo(() => props.pagination.getPerPage(), [props.pagination])

    const perPageList = [
        {value: 5, text: '5'},
        {value: 15, text: '15'},
        {value: 50, text: '50'},
        //{value: -1, text: 'All'}
    ]

    return <div className="flex justify-between items-center">
        <nav aria-label="Page navigation example">
            <ul className="flex items-center gap-2 h-10 text-base">
                <li>
                    <Button disabled={!previousPageEnabled}
                            onClick={() => props.onPage && props.onPage(currentPage - 1)}
                            icon={mdiChevronLeft}/>
                </li>
                {
                    hasFirstPage && <li>
                        <Button onClick={() => props.onPage && props.onPage(1)}>1</Button>
                    </li>
                }
                {
                    hasPreviousDots && <li className="px-4 h-10 flex items-center justify-center">
                        ...
                    </li>
                }
                {
                    pagesBeforeCurrent.map((page, i) =>
                        <li key={i}>
                            <Button onClick={() => props.onPage && props.onPage(page)}>{page}</Button>
                        </li>
                    )
                }
                <li>
                    <Button className="bg-primary-800! text-white!">{currentPage}</Button>
                </li>
                {
                    pagesAfterCurrent.map((page, i) =>
                        <li key={i}>
                            <Button onClick={() => props.onPage && props.onPage(page)}>{page}</Button>
                        </li>
                    )
                }
                {
                    hasNextDots && <li className="px-4 h-10 flex items-center justify-center">
                        ...
                    </li>
                }
                {
                    hasLastPage && <li>
                        <Button onClick={() => props.onPage && props.onPage(totalPages)}>{totalPages}</Button>
                    </li>
                }
                {
                    <li>
                        <Button disabled={!nextPageEnabled}
                                onClick={() => props.onPage && props.onPage(currentPage + 1)}
                                icon={mdiChevronRight}/>
                    </li>
                }
            </ul>
        </nav>
        <SelectField value={perPage} name="per_page" items={perPageList}
                     onChange={(perPage) => props.onPerPage && props.onPerPage(perPage)}/>
    </div>
}