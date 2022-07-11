import { useState, useContext } from "react";
import { ModalContext } from "../../../../../blocks/content/Main.jsx";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control.js";
import { useTypedDispatch } from "../../../../../redux/hooks/hooks";

export function useDeleteOrg(id, action) {
    const dispatch = useTypedDispatch();
    const [loader, setLoader] = useState(false);
    const { setModalDelete } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalDelete);

    async function deleteOrg(event) {
        event.preventDefault();
        setLoader(true);
        await dispatch(action(id));
        hideModal();
    }

    return [loader, deleteOrg, hideModal];
}
