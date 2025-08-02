import Modal from "@/components/Modal";
import React from "react";
import Button from "@/components/io/Button";
import {useClientLocale} from "@/composables/useServerLocale";

type Props = {
    loading: boolean,
    onClose?: (e: React.MouseEvent) => void,
    onAction?: (confirmation: boolean) => void,
    value: boolean,
    title?: React.ReactNode,
    description?: React.ReactNode,
}

export default function ConfirmationModal(props: Props) {

    const {t} = useClientLocale()

    return <Modal value={props.value} onClose={props.onClose} title={props.title} action={
        <>
            <Button className="w-20" loading={props.loading} onClick={() => props.onAction && props.onAction(true)}>
                {t('confirmationModal.buttons.yes')}
            </Button>
            <Button className="w-20" variant="filled" onClick={() => props.onAction && props.onAction(false)}>
                {t('confirmationModal.buttons.no')}
            </Button>
        </>
    }>
        {props.description}
    </Modal>
}