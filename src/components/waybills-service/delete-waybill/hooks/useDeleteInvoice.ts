import React, { useContext } from "react";
import { modalManager } from "../../../../UI/modal/service/handlers/modal-control";
import { ModalContext } from "../../../../blocks/content/Main";
import { useTypedDispatch } from "../../../../redux/hooks/hooks";

export function useDeleteInvoice(
    id: number | null | undefined,
    deleteAction: (id: number) => any
) {
    const dispatch = useTypedDispatch();
    const { setModalDelete } = useContext(ModalContext)!;
    const [, hideDeleteModal] = modalManager(setModalDelete);

    async function deleteInvoice(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        id && (await dispatch(deleteAction(id)));
        hideDeleteModal();
    }

    return [hideDeleteModal, deleteInvoice];
}
