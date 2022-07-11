import { isInnKppValid } from "../scripts/isInnKppValid.js";
import { isAllRequisitesFilled } from "../scripts/isAllRequisitesFilled.js";
import { useState, useContext } from "react";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control.js";
import { ModalContext } from "../../../../../blocks/content/Main.jsx";
import { useTypedDispatch } from "../../../../../redux/hooks/hooks.ts";

export function useCreateOrg(action) {
    const dispatch = useTypedDispatch();
    const [loader, setLoader] = useState(false);
    const { setModalAdd } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalAdd);

    async function create(event, organization) {
        event.preventDefault();

        if (isInnKppValid(organization) === false) return;
        if (isAllRequisitesFilled(organization) === false) return;

        setLoader(true);
        await dispatch(action(organization));
        hideModal();
    }

    return [loader, create];
}
