import { useContext } from "react";
import { modalManager } from "../../../../UI/modal/service/handlers/modal-control.js";
import { ModalContext } from "../../../../blocks/content/Main";
import { useTypedDispatch } from "../../../../redux/hooks/hooks";

export function useDeleteWaybill(id, deleteAction) {
    const dispatch = useTypedDispatch();
    const { setModalDelete } = useContext(ModalContext);
    const [, hideDeleteModal] = modalManager(setModalDelete);

    async function deleteInvoice(event) {
        event.preventDefault();

        id && (await dispatch(deleteAction(id)));
        hideDeleteModal();
    }

    return [hideDeleteModal, deleteInvoice];
}
