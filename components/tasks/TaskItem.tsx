import Task from "@/assets/ts/models/task/Task";
import {useMemo} from "react";
import User from "@/assets/ts/models/User";
import Project from "@/assets/ts/models/project/Project";
import Chip from "@/components/tasks/Chip";
import {useClientLocale} from "@/composables/useServerLocale";
import Menu from "@/components/Menu";
import Button from "@/components/io/Button";
import {mdiDotsVertical} from "@mdi/js";
import List from "@/components/List";
import ListItem from "@/components/ListItem";

type Props = {
    task: Task,
    onEdit?: (project: Task) => void,
    onDelete?: (project: Task) => void,
}

export default function TaskItem(props: Props) {

    const name = useMemo(() => props.task.getTitle(), [props.task]);
    const description = useMemo(() => props.task.getDescription(), [props.task]);
    const dueDate = useMemo(() => props.task.getDueDate(), [props.task]);
    const assignedToUser = useMemo(() => props.task.getAssignedToUser(), [props.task]);
    const assignedToUserFullName = useMemo(() => assignedToUser instanceof User ? assignedToUser.getFullName() : null, [props.task]);
    const assignedToUserNameLetters = useMemo(() => String(assignedToUserFullName).split(' ').map(name => String(name).charAt(0).toUpperCase()).join(''), [props.task]);
    const project = useMemo(() => props.task.getProject(), [props.task]);
    const projectName = useMemo(() => project instanceof Project ? project.getName() : null, [props.task]);
    const taskPriority = useMemo(() => props.task.getPriority(), [props.task]);
    const taskStatus = useMemo(() => props.task.getStatus(), [props.task]);

    const priorityColor = useMemo(() => {

        switch (taskPriority) {
            case Task.LOW_PRIORITY:
                return 'bg-green-500';
            case Task.MEDIUM_PRIORITY:
                return 'bg-yellow-500';
            case Task.HIGH_PRIORITY:
                return 'bg-red-500';
        }

    }, [props.task]);

    const statusColor = useMemo(() => {

        switch (taskStatus) {
            case Task.DONE_STATUS:
                return 'bg-green-500';
            case Task.IN_PROGRESS_STATUS:
                return 'bg-blue-500';
            case Task.TODO_STATUS:
                return 'bg-yellow-500';
        }

    }, [props.task]);

    const {t} = useClientLocale()

    return <div
        className="flex flex-col gap-8 p-4 border bg-white hover:shadow-xl shadow-sm rounded-xl border-gray-200">
        <div className="flex justify-between">
            <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                    <span className="text-2xl font-bold">{name}</span>
                    <Chip bgColor={statusColor}>{t(['globals.task.statuses', taskStatus].join('.'))}</Chip>
                    <Chip bgColor={priorityColor}>{t(['globals.task.priorities', taskPriority].join('.'))}</Chip>
                </div>
                <span className="text-gray-500">{description}</span>
            </div>
            <Menu button={<Button icon={mdiDotsVertical}/>}>
                <List>
                    <ListItem onClick={() => props.onEdit && props.onEdit(props.task)}>
                        {t('task.item.buttons.edit')}
                    </ListItem>
                    <ListItem onClick={() => props.onDelete && props.onDelete(props.task)}>
                        {t('task.item.buttons.delete')}
                    </ListItem>
                </List>
            </Menu>
        </div>
        <div className="flex text-sm gap-8">
            <div className="flex items-center gap-2">
                <div
                    className="rounded-full flex justify-center text-xs items-center bg-primary-800 text-white h-7 w-7">
                    {assignedToUserNameLetters}
                </div>
                <span>{assignedToUserFullName}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-gray-500">{t('task.item.project')}</span>
                <div>{projectName}</div>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-gray-500">{t('task.item.due_date')}</span>
                <span>{dueDate}</span>
            </div>
        </div>
    </div>
}