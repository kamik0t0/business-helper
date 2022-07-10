import { checkInnKpp } from "../handlers/check-inn-kpp.js";
import { useState, useContext } from "react";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control.js";
import { ModalContext } from "../../../../../blocks/content/Main.jsx";
import { useTypedDispatch } from "../../../../../redux/hooks/hooks.ts";
import { postOrganization } from "../../../../../redux/actions/OrgsAction";

export function useCreateOrg() {
    const dispatch = useTypedDispatch();
    const [loader, setLoader] = useState(false);
    const { setModalAdd } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalAdd);

    async function create(event, organization) {
        event.preventDefault();

        if (checkInnKpp(organization) === false) return;

        setLoader(true);
        await dispatch(postOrganization(organization));
        hideModal();
    }

    return [loader, create];
}
