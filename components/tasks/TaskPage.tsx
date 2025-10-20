'use client'

import Button from "@/components/io/Button";
import {useEffect, useMemo, useState} from "react";
import Task from "@/assets/ts/models/task/Task";
import {useClientLocale} from "@/composables/useServerLocale";
import PaginatedItems from "@/components/PaginatedItems";
import Pagination from "@/assets/ts/models/Pagination";
import TaskItem from "@/components/tasks/TaskItem";
import {useSyncFetchData} from "@/composables/useFetchedData";
import {useDeleteTaskApi, useFilteredTasksApi} from "@/assets/ts/api/TaskApis";
import TaskPagination from "@/assets/ts/models/task/TaskPagination";
import TaskFormModal from "@/components/tasks/TaskFormModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import FormAlertMessage from "@/components/FormAlertMessage";

export default function TaskPage() {

    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isListLoading, setIsListLoading] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [alertStatus, setAlertStatus] = useState<'warning' | 'success' | 'error'>('success');
    const [alertMessage, setAlertMessage] = useState('');
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [pagination, setPagination] = useState<Pagination>(new Pagination({
        [Pagination.getPerPageAttributeName()]: 5,
        [Pagination.getCurrentPageAttributeName()]: 1
    }));
    const items = useMemo(() => pagination.getData(), [pagination])

    function getFilteredTasks(taskPagination?: TaskPagination) {
        if (taskPagination) {
            setPagination(taskPagination);
            return
        }

        useSyncFetchData(useFilteredTasksApi({
            per_page: pagination.getPerPage(),
            page: pagination.getCurrentPage()
        }))
            .onStart(() => setIsListLoading(true))
            .onSuccess((taskPagination: TaskPagination) => setPagination(taskPagination), TaskPagination)
            .onFinished(() => setIsListLoading(false))
    }

    function deleteTask(deleteConfirmation: boolean) {

        if (!deleteConfirmation) {
            setIsDeleteModalOpen(false)
            return;
        }

        const taskId = selectedTask instanceof Task ? selectedTask.getId() : null

        if (!taskId) {
            return
        }

        useSyncFetchData(useDeleteTaskApi(taskId, {
            per_page: pagination.getPerPage(),
            page: pagination.getCurrentPage()
        }))
            .onStart(() => setDeleteLoading(true))
            .onSuccess((taskPagination: TaskPagination, message: string) => {
                setIsDeleteModalOpen(false)
                getFilteredTasks(taskPagination)
                setSnackSuccessMessage(message)
            }, TaskPagination)
            .onFailure((message: any) => {
                setAlertStatus('error')
                setAlertMessage(message)
            })
            .onFinished(() => setDeleteLoading(false))
    }

    function createNewProject() {
        setSelectedTask(null);
        setIsFormOpen(true);
    }

    function editProject(task: Task) {
        setSelectedTask(task)
        setIsFormOpen(true)
    }

    function deleteProjectConfirmation(task: Task) {
        setSelectedTask(task)
        setIsDeleteModalOpen(true)
    }

    function getFilteredPerPageProjects(perPage: number) {
        pagination.setPerPage(perPage)
        setPagination(pagination)
        getFilteredTasks()
    }

    function getFilteredPageTasks(page: number) {
        pagination.setCurrentPage(page)
        setPagination(pagination)
        getFilteredTasks()
    }

    function setSnackSuccessMessage(message: string) {
        setAlertStatus('success')
        setAlertMessage(message)
    }

    function setSnackErrorMessage(message: string) {
        setAlertStatus('error')
        setAlertMessage(message)
    }

    useEffect(() => {
        getFilteredTasks()
    }, [])

    const {t} = useClientLocale()

    return <>
        <div className="flex justify-between items-center">
            <span className="font-bold text-2xl">{t('task.title')}</span>
            <Button onClick={createNewProject} variant="filled">
                {t('task.buttons.title')}
            </Button>
        </div>

        <PaginatedItems pagination={pagination} loading={isListLoading} onPage={getFilteredPageTasks}
                        onPerPage={getFilteredPerPageProjects}>
            {
                items.map((item: Task, index: number) =>
                    <TaskItem key={index} onEdit={editProject} onDelete={deleteProjectConfirmation} task={item}/>
                )
            }
        </PaginatedItems>

        <TaskFormModal pagination={pagination} value={isFormOpen} task={selectedTask} onSuccessSnackMessage={setSnackSuccessMessage}
                          onErrorSnackMessage={setSnackErrorMessage} onPaginate={getFilteredTasks} onClose={() => setIsFormOpen(false)}/>

        <ConfirmationModal loading={deleteLoading} value={isDeleteModalOpen} onAction={deleteTask}
                           title={t('task.dialogs.delete.title')} onClose={() => setIsDeleteModalOpen(false)}
                           description={t('task.dialogs.delete.description')}/>

        <FormAlertMessage type={alertStatus} message={alertMessage} absolute={true} fullWidth={false} timeout={5000} open={!!alertMessage}
                          onCloseAction={() => setAlertMessage('')}/>
    </>
}