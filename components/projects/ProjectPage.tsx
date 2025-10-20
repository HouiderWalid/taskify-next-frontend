'use client'

import Button from "@/components/io/Button";
import PaginatedItems from "@/components/PaginatedItems";
import Project from "@/assets/ts/models/project/Project";
import ProjectItem from "@/components/projects/ProjectItem";
import ProjectFormModal from "@/components/ProjectFormModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import FormAlertMessage from "@/components/FormAlertMessage";
import {useEffect, useMemo, useState} from "react";
import Pagination from "@/assets/ts/models/Pagination";
import ProjectPagination from "@/assets/ts/models/project/ProjectPagination";
import {useSyncFetchData} from "@/composables/useFetchedData";
import {useDeleteProjectApi, useFilteredProjectsApi} from "@/assets/ts/api/ProjectApis";
import {useClientLocale} from "@/composables/useServerLocale";

export default function ProjectPage() {

    const {t} = useClientLocale()
    const [alertStatus, setAlertStatus] = useState<'warning' | 'success' | 'error'>('success');
    const [alertMessage, setAlertMessage] = useState('');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [isListLoading, setIsListLoading] = useState(false);
    const [pagination, setPagination] = useState<Pagination>(new Pagination({
        [Pagination.getPerPageAttributeName()]: 5,
        [Pagination.getCurrentPageAttributeName()]: 1
    }));
    const items = useMemo(() => pagination.getData(), [pagination])

    function createNewProject() {
        setSelectedProject(null);
        setIsFormOpen(true);
    }

    function getFilteredProjects(projectPagination?: ProjectPagination) {
        if (projectPagination) {
            setPagination(projectPagination);
            return
        }

        useSyncFetchData(useFilteredProjectsApi({
            per_page: pagination.getPerPage(),
            page: pagination.getCurrentPage()
        }))
            .onStart(() => setIsListLoading(true))
            .onSuccess((projectPagination: ProjectPagination) => setPagination(projectPagination), ProjectPagination)
            .onFinished(() => setIsListLoading(false))
    }

    function deleteProject(deleteConfirmation: boolean) {

        if (!deleteConfirmation) {
            setIsDeleteModalOpen(false)
            return;
        }

        const projectId = selectedProject instanceof Project ? selectedProject.getId() : null

        if (!projectId) {
            return
        }

        useSyncFetchData(useDeleteProjectApi(projectId, {
            per_page: pagination.getPerPage(),
            page: pagination.getCurrentPage()
        }))
            .onStart(() => setDeleteLoading(true))
            .onSuccess((projectPagination: ProjectPagination, message: string) => {
                setIsDeleteModalOpen(false)
                getFilteredProjects(projectPagination)
                setSnackSuccessMessage(message)
            }, ProjectPagination)
            .onFailure((message: any) => {
                setAlertStatus('error')
                setAlertMessage(message)
            })
            .onFinished(() => setDeleteLoading(false))
    }

    function setSnackSuccessMessage(message: string) {
        setAlertStatus('success')
        setAlertMessage(message)
    }

    function setSnackErrorMessage(message: string) {
        setAlertStatus('error')
        setAlertMessage(message)
    }

    function editProject(project: Project) {
        setSelectedProject(project)
        setIsFormOpen(true)
    }

    function deleteProjectConfirmation(project: Project) {
        setSelectedProject(project)
        setIsDeleteModalOpen(true)
    }

    function getFilteredPerPageProjects(perPage: number) {
        pagination.setPerPage(perPage)
        setPagination(pagination)
        getFilteredProjects()
    }

    function getFilteredPageProjects(page: number) {
        pagination.setCurrentPage(page)
        setPagination(pagination)
        getFilteredProjects()
    }

    useEffect(() => {
        getFilteredProjects()
    }, [])

    return <>
        <div className="flex justify-between items-center">
            <span className="font-bold text-2xl">{t('project.title')}</span>
            <Button id="open-create-project-modal" onClick={createNewProject} variant="filled">
                {t('project.buttons.newProjects')}
            </Button>
        </div>

        <PaginatedItems pagination={pagination} loading={isListLoading} onPage={getFilteredPageProjects}
                        onPerPage={getFilteredPerPageProjects}>
            {
                items.map((item: Project, index: number) => {
                    return <ProjectItem key={index} onEdit={editProject} onDelete={deleteProjectConfirmation}
                                        project={item}/>
                })
            }
        </PaginatedItems>

        <ProjectFormModal id="project-modal" pagination={pagination} value={isFormOpen} project={selectedProject} onSuccessSnackMessage={setSnackSuccessMessage}
                          onErrorSnackMessage={setSnackErrorMessage} onPaginate={getFilteredProjects} onClose={() => setIsFormOpen(false)}/>

        <ConfirmationModal loading={deleteLoading} value={isDeleteModalOpen} onAction={deleteProject}
                           title={t('project.dialogs.delete.title')} onClose={() => setIsDeleteModalOpen(false)}
                           description={t('project.dialogs.delete.description')}/>

        <FormAlertMessage type={alertStatus} message={alertMessage} fullWidth={false} absolute={true} timeout={5000} open={!!alertMessage}
                          onCloseAction={() => setAlertMessage('')}/>
    </>
}