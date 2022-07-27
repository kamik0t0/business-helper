import { useContext } from "react";
import { modalManager } from "../../../../UI/modal/service/handlers/modal-control";
import { ModalContext } from "../../../../blocks/content/Main";
import { useTypedDispatch } from "../../../../redux/hooks/hooks";
import { IEvent } from "../../../../interfaces/event";

export function useDeleteWaybill(
    id: number,
    deleteAction: (id: number) => any
) {
    const dispatch = useTypedDispatch();
    const { setModalDelete } = useContext(ModalContext);
    const [, hideDeleteModal] = modalManager(setModalDelete);

    async function deleteInvoice(event: IEvent) {
        event.preventDefault();

        id && (await dispatch(deleteAction(id)));
        hideDeleteModal();
    }

    return [hideDeleteModal, deleteInvoice];
}
