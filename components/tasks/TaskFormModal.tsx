import Task from "@/assets/ts/models/task/Task";
import Pagination from "@/assets/ts/models/Pagination";
import TaskPagination from "@/assets/ts/models/task/TaskPagination";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Button from "@/components/io/Button";
import Modal from "@/components/Modal";
import {useClientLocale} from "@/composables/useServerLocale";
import {useEffect, useMemo, useState} from "react";
import Project from "@/assets/ts/models/project/Project";
import {useSyncFetchData} from "@/composables/useFetchedData";
import moment from "moment/moment";
import {useCreateTaskApi, useFormMembersApi, useFormProjectsApi, useUpdateTaskApi} from "@/assets/ts/api/TaskApis";
import TextField from "@/components/io/TextField";
import TextArea from "@/components/io/TextArea";
import Autocomplete from "@/components/io/select/Autocomplete";
import ProjectCollection from "@/assets/ts/models/project/ProjectCollection";
import UserCollection from "@/assets/ts/models/user/UserCollection";
import User from "@/assets/ts/models/User";
import RadioButton from "@/components/io/radio/RadioButton";


type Props = {
    task?: Task | null;
    pagination: Pagination;
    onPaginate?: (pagination?: TaskPagination) => void;
    onSuccessSnackMessage?: (message: string) => void;
    onErrorSnackMessage?: (message: string) => void;
    onClose?: () => void;
    value: boolean
}

export default function TaskFormModal(props: Props) {

    const schema = z.object({
        title: z.string().min(3, "Project name must have at least 3 characters"),
        due_date: z.string()
            .refine(val => {
                const givenDate = new Date(val);
                return givenDate.getTime() > Date.now();
            }, {
                message: 'Date must be in the future.'
            }),
        description: z.string().min(3, "Project description must have at least 3 characters"),
    });

    type FormData = z.infer<typeof schema>;

    const {
        register,
        trigger,
        watch,
        reset,
        formState: {errors},
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const [isCreateLoading, setCreateLoading] = useState<boolean>(false);
    const [isEditLoading, setEditLoading] = useState<boolean>(false);
    const [serverErrors, setServerErrors] = useState<object[]>([])
    const modalTitle = useMemo(() => ['project.dialogs.form.title', props.task instanceof Task ? 'edit' : 'create'].join('.'), [props.task])
    const [name, setName] = useState("")
    const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD HH:mm:ss').toString())
    const [description, setDescription] = useState("")
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [selectedMember, setSelectedMember] = useState<User | null>(null)
    const [projects, setProjects] = useState<ProjectCollection>([])
    const [members, setMembers] = useState<UserCollection>([])
    const [priority, setPriority] = useState(Task.LOW_PRIORITY)
    const priorities = [
        {value: Task.LOW_PRIORITY, text: ['globals.task.priorities', Task.LOW_PRIORITY].join('.')},
        {value: Task.MEDIUM_PRIORITY, text: ['globals.task.priorities', Task.MEDIUM_PRIORITY].join('.')},
        {value: Task.HIGH_PRIORITY, text: ['globals.task.priorities', Task.HIGH_PRIORITY].join('.')}
    ]

    const memberIdServerError = serverErrors.filter((serverError: {
        path?: string
    }) => serverError?.path === "member_id")
    const projectIdServerError = serverErrors.filter((serverError: {
        path?: string
    }) => serverError?.path === "project_id")
    const titleServerError = serverErrors.filter((serverError: { path?: string }) => serverError?.path === "title")
    const dueDateServerError = serverErrors.filter((serverError: { path?: string }) => serverError?.path === "due_date")
    const descriptionServerError = serverErrors.filter((serverError: {
        path?: string
    }) => serverError?.path === "description")

    async function createTask() {
        const isValid = await trigger()
        if (!isValid) {
            return
        }

        const formData = {
            title: name,
            priority,
            project_id: selectedProject instanceof Project ? selectedProject.getId() : selectedProject,
            member_id: selectedMember instanceof User ? selectedMember.getId() : selectedMember,
            description,
            due_date: date
        }

        useSyncFetchData(useCreateTaskApi(formData, {
            per_page: props.pagination.getPerPage(),
            page: props.pagination.getCurrentPage()
        }))
            .onStart(() => setCreateLoading(true))
            .onValidationErrors((errors: any[]) => setServerErrors(errors))
            .onSuccess((taskPagination: TaskPagination, message: string) => {
                props.onClose && props.onClose();
                props.onPaginate && props.onPaginate(taskPagination)
                props.onSuccessSnackMessage && props.onSuccessSnackMessage(message)
            }, TaskPagination)
            .onFailure((message: string) => props.onErrorSnackMessage && props.onErrorSnackMessage(message))
            .onFinished(() => setCreateLoading(false))
    }

    async function updateTask() {
        const isValid = await trigger()
        if (!isValid) {
            return
        }

        const taskId = props.task instanceof Task ? props.task.getId() : null
        if (!taskId) {
            return
        }

        const formData = {
            title: name,
            priority,
            project_id: selectedProject instanceof Project ? selectedProject.getId() : selectedProject,
            member_id: selectedMember instanceof User ? selectedMember.getId() : selectedMember,
            description,
            due_date: date
        }

        useSyncFetchData(useUpdateTaskApi(taskId, formData, {
            per_page: props.pagination.getPerPage(),
            page: props.pagination.getCurrentPage()
        }))
            .onStart(() => setEditLoading(true))
            .onValidationErrors((errors: any[]) => setServerErrors(errors))
            .onSuccess((taskPagination: TaskPagination, message: string) => {
                props.onClose && props.onClose();
                props.onPaginate && props.onPaginate(taskPagination)
                props.onSuccessSnackMessage && props.onSuccessSnackMessage(message)
            }, TaskPagination)
            .onFailure((message: string) => props.onErrorSnackMessage && props.onErrorSnackMessage(message))
            .onFinished(() => setEditLoading(false))
    }

    function getTaskFormProjects() {
        useSyncFetchData(useFormProjectsApi())
            .onSuccess((projectCollection: ProjectCollection) => setProjects(projectCollection), ProjectCollection)
    }

    function getTaskFormMembers() {
        useSyncFetchData(useFormMembersApi())
            .onSuccess((userCollection: UserCollection) => setMembers(userCollection), UserCollection)
    }

    const {t} = useClientLocale()

    useEffect(() => {

        reset()
        setName('')
        setSelectedProject(null)
        setSelectedMember(null)
        setPriority(Task.LOW_PRIORITY)
        setDescription('')
        setDate(moment(new Date()).format('YYYY-MM-DD HH:mm:ss').toString())

        getTaskFormProjects()
        getTaskFormMembers()

        if (!props.task) {
            return
        }

        setName(props.task.getTitle())
        setDescription(props.task.getDescription())
        setDate(props.task.getDueDate())
        setSelectedProject(props.task.getProject())
        setSelectedMember(props.task.getAssignedToUser())
        setPriority(props.task.getPriority())

    }, [props.value])

    return <Modal value={props.value} onClose={() => props.onClose && props.onClose()} title={t(modalTitle)} action={
        <>
            {
                props.task ?
                    <Button className="w-20" loading={isEditLoading} onClick={() => updateTask()} variant="filled">
                        {t('project.dialogs.form.buttons.save')}
                    </Button> :
                    <Button className="w-20" loading={isCreateLoading} onClick={() => createTask()} variant="filled">
                        {t('project.dialogs.form.buttons.create')}
                    </Button>
            }
            {
                <Button onClick={() => props.onClose && props.onClose()}>
                    {t('project.dialogs.form.buttons.cancel')}
                </Button>
            }
        </>
    }>
        <Autocomplete label={t('task.dialogs.form.fields.project.title')} itemTextKey={Project.getNameAttributeName()}
                      itemValueKey={Project.getIdAttributeName()} setValue={value => setSelectedProject(value)}
                      placeholder={t('task.dialogs.form.fields.project.placeholder')} value={selectedProject}
                      name="project" items={projects} errorMessages={[projectIdServerError[0]]}/>
        <Autocomplete label={t('task.dialogs.form.fields.member.title')} itemValueKey={User.getIdAttributeName()}
                      itemTextKey={User.getFullNameAttributeName()} setValue={value => setSelectedMember(value)}
                      placeholder={t('task.dialogs.form.fields.member.placeholder')} value={selectedMember}
                      name="member" items={members} errorMessages={[memberIdServerError[0]]}/>
        <TextField value={name} setValue={setName} id="title" name="title" registerAction={register} label="Name"
                   placeholder="Enter the project name"
                   errorMessages={[errors.title?.message ?? titleServerError[0]]}/>
        <TextField value={date} setValue={setDate} id="due_date" name="due_date" registerAction={register}
                   label="Due Date" type="datetime-local"
                   errorMessages={[errors.due_date?.message ?? dueDateServerError[0]]}/>
        <RadioButton name="priority" items={priorities} selected={priority} setValue={setPriority}
                     label={t('task.dialogs.form.fields.priority.title')}/>
        <TextArea value={description} setValue={setDescription} id="description" name="description"
                  registerAction={register} label="Description" placeholder="Describe the project"
                  errorMessages={[errors.description?.message ?? descriptionServerError[0]]}/>
    </Modal>
}