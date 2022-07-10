import { useState, useContext } from "react";
import { ModalContext } from "../../../../../blocks/content/Main.jsx";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control.js";
import { useTypedDispatch } from "../../../../../redux/hooks/hooks";
import { deleteOrganization } from "../../../../../redux/actions/OrgsAction";
import { useTypedSelector } from "../../../../../redux/hooks/hooks";

export function useDeleteOrg() {
    const USERORG = useTypedSelector((state) => state.orgsReducer.org);
    const dispatch = useTypedDispatch();
    const [loader, setLoader] = useState(false);
    const { setModalDelete } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalDelete);

    async function deleteOrg(event) {
        event.preventDefault();
        setLoader(true);
        await dispatch(deleteOrganization(USERORG.id));
        hideModal();
    }

    return [loader, deleteOrg, hideModal, USERORG];
}
