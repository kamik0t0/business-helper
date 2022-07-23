import { isInnKppValid } from "../scripts/isInnKppValid.ts";
import { isAllRequisitesFilled } from "../scripts/isAllRequisitesFilled.ts";
import { useContext } from "react";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control";
import { ModalContext } from "../../../../../blocks/content/Main";
import { useTypedDispatch } from "../../../../../redux/hooks/hooks";

export function useCreateOrg(action, ORG) {
    const dispatch = useTypedDispatch();
    const { setModalAdd } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalAdd);

    async function create(event, organization) {
        event.preventDefault();

        if (isInnKppValid(organization) === false) return;
        if (isAllRequisitesFilled(organization) === false) return;
        await dispatch(action(organization));
        hideModal();
    }

    return (event) => create(event, ORG.current);
}
