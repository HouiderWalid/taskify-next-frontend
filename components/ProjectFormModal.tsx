import Modal from "@/components/Modal";
import {useEffect, useMemo, useState} from "react";
import Project from "@/assets/ts/models/project/Project";
import Button from "@/components/io/Button";
import {useSyncFetchData} from "@/composables/useFetchedData";
import {useCreateProjectApi, useUpdateProjectApi} from "@/assets/ts/api/ProjectApis";
import Pagination from "@/assets/ts/models/Pagination";
import ProjectPagination from "@/assets/ts/models/project/ProjectPagination";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import TextField from "@/components/io/TextField";
import TextArea from "@/components/io/TextArea";
import {useClientLocale} from "@/composables/useServerLocale";
import moment from "moment";

type Props = {
    project?: Project | null;
    pagination: Pagination;
    onPaginate?: (pagination?: ProjectPagination) => void;
    onSuccessSnackMessage?: (message: string) => void;
    onErrorSnackMessage?: (message: string) => void;
    onClose?: () => void;
    value: boolean
}

type ServerErrors = {
    [key: string]: Array<string>;
}

export default function ProjectFormModal(props: Props) {

    const schema = z.object({
        name: z.string().min(3, "Project name must have at least 3 characters"),
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

    const [isCreateLoading, setCreateLoading] = useState(false)
    const [isEditLoading, setEditLoading] = useState(false)
    const {t} = useClientLocale()
    const [serverErrors, setServerErrors] = useState<ServerErrors>({})
    const [name, setName] = useState("")
    const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD HH:mm:ss').toString())
    const [description, setDescription] = useState("")

    const modalTitle = useMemo(() => ['project.dialogs.form.title', props.project instanceof Project ? 'edit' : 'create'].join('.'), [props.project])

    async function createProject() {
        const isValid = await trigger()
        if (!isValid) {
            return
        }

        const formData = {
            name,
            description,
            due_date: date
        }

        useSyncFetchData(useCreateProjectApi(formData, {
            per_page: props.pagination.getPerPage(),
            page: props.pagination.getCurrentPage()
        }))
            .onStart(() => setCreateLoading(true))
            .onValidationErrors((errors: ServerErrors) => setServerErrors(errors))
            .onSuccess((projectPagination: ProjectPagination, message: string) => {
                props.onClose && props.onClose();
                props.onPaginate && props.onPaginate(projectPagination)
                props.onSuccessSnackMessage && props.onSuccessSnackMessage(message)
            }, ProjectPagination)
            .onFailure((message: string) => props.onErrorSnackMessage && props.onErrorSnackMessage(message))
            .onFinished(() => setCreateLoading(false))
    }

    async function updateProject() {
        const isValid = await trigger()
        if (!isValid) {
            return
        }

        const projectId = props.project instanceof Project ? props.project.getId() : null
        if (!projectId) {
            return
        }

        const formData = {
            name,
            description,
            due_date: date
        }

        useSyncFetchData(useUpdateProjectApi(projectId, formData, {
            per_page: props.pagination.getPerPage(),
            page: props.pagination.getCurrentPage()
        }))
            .onStart(() => setEditLoading(true))
            .onValidationErrors((errors: ServerErrors) => setServerErrors(errors))
            .onSuccess((projectPagination: ProjectPagination, message: string) => {
                props.onClose && props.onClose();
                props.onPaginate && props.onPaginate(projectPagination)
                props.onSuccessSnackMessage && props.onSuccessSnackMessage(message)
            }, ProjectPagination)
            .onFailure((message: string) => props.onErrorSnackMessage && props.onErrorSnackMessage(message))
            .onFinished(() => setEditLoading(false))
    }

    useEffect(() => {
        reset()
        setName('')
        setDescription('')
        setDate(moment(new Date()).format('YYYY-MM-DD HH:mm:ss').toString())

        if (!props.project) {
            return
        }

        setName(props.project.getName())
        setDescription(props.project.getDescription())
        setDate(props.project.getDueDate())
    }, [props.value])

    return <Modal value={props.value} onClose={() => props.onClose && props.onClose()} title={t(modalTitle)} action={
        <>
            {
                props.project ?
                    <Button className="w-20" loading={isEditLoading} onClick={() => updateProject()} variant="filled">
                        {t('project.dialogs.form.buttons.save')}
                    </Button> :
                    <Button className="w-20" loading={isCreateLoading} onClick={() => createProject()} variant="filled">
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
        <TextField value={name} setValue={setName} id="name" name="name" registerAction={register} label="Name"
                   placeholder="Enter the project name"
                   errorMessages={[errors.name?.message ?? serverErrors?.name?.[0]]}/>
        <TextField value={date} setValue={setDate} id="due_date" name="due_date" registerAction={register}
                   label="Due Date"
                   type="datetime-local"
                   errorMessages={[errors.due_date?.message ?? serverErrors?.due_date?.[0]]}/>
        <TextArea value={description} setValue={setDescription} id="description" name="description"
                  registerAction={register} label="Description"
                  placeholder="Describe the project"
                  errorMessages={[errors.description?.message ?? serverErrors?.description?.[0]]}/>
    </Modal>
}