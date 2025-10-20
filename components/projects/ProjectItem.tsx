import Project from "@/assets/ts/models/project/Project";
import Menu from "@/components/Menu"
import List from "@/components/List";
import {useMemo} from "react";
import Button from "@/components/io/Button";
import {mdiDotsVertical} from "@mdi/js";
import ListItem from "@/components/ListItem";
import ProgressBar from "@/components/ProgressBar";
import {useClientLocale} from "@/composables/useServerLocale";

type Props = {
    project: Project,
    onEdit?: (project: Project) => void,
    onDelete?: (project: Project) => void,
}

export default function ProjectItem(props: Props) {

    const name = useMemo(() => props.project.getName(), [props.project]);
    const description = useMemo(() => props.project.getDescription(), [props.project]);
    const dueDate = useMemo(() => props.project.getDueDate(), [props.project]);
    const tasksCount = useMemo(() => props.project.getTasksCount(), [props.project]);
    const tasksDoneCount = useMemo(() => props.project.getTasksDoneCount(), [props.project]);
    const progress = useMemo(() => Number(tasksCount > 0 ? tasksDoneCount * 100 / tasksCount : 100).toFixed(2), [props.project])
    const teamMembers = useMemo(() => props.project.getTasksAssignedMembersCount(), [props.project]);

    const {t} = useClientLocale();

    return <div id={'project-card-' + props.project.getId()}
        className="flex flex-col gap-8 p-4 border bg-white hover:shadow-xl shadow-sm rounded-xl border-gray-200">
        <div className="flex justify-between">
            <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                    <span id={'project-card-name-' + props.project.getId()} className="text-2xl font-bold">{name}</span>
                </div>
                <span id={'project-card-description-' + props.project.getId()}
                      className="text-gray-500">{description}</span>
            </div>
            <Menu button={<Button id={'project-card-actions-' + props.project.getId()} icon={mdiDotsVertical}/>}>
                <List>
                    <ListItem id={'project-card-edit-btn-' + props.project.getId()}
                              onClick={() => props.onEdit && props.onEdit(props.project)}>
                        {t('project.item.buttons.edit')}
                    </ListItem>
                    <ListItem id={'project-card-delete-btn-' + props.project.getId()}
                              onClick={() => props.onDelete && props.onDelete(props.project)}>
                        {t('project.item.buttons.delete')}
                    </ListItem>
                </List>
            </Menu>
        </div>
        <div className="flex flex-col gap-4">
            <ProgressBar value={progress} title={t('project.item.progress')}/>
            <div className="flex text-sm gap-8">
                <div className="flex gap-2">
                    <span className="text-gray-500">{t('project.item.team')}</span>
                    <span>{teamMembers}</span>
                </div>
                <div className="flex gap-2">
                    <span className="text-gray-600">{t('project.item.due_date')}</span>
                    <span>{dueDate}</span>
                </div>
            </div>
        </div>
    </div>
}