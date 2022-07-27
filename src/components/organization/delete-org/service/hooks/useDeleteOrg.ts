import { useContext } from "react";
import { ModalContext } from "../../../../../blocks/content/Main.jsx";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control";
import { useTypedDispatch } from "../../../../../redux/hooks/hooks";
import { IEvent } from "../../../../../interfaces/event";

export function useDeleteOrg(id: number, action: (id: number) => any) {
    const dispatch = useTypedDispatch();
    const { setModalDelete } = useContext(ModalContext);
    const [_, hideModal] = modalManager(setModalDelete);

    async function deleteOrg(event: IEvent) {
        event.preventDefault();

        await dispatch(action(id));
        hideModal();
    }

    return [deleteOrg, hideModal];
}
