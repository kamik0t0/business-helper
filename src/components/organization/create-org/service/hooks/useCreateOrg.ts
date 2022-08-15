import React, { useContext } from "react";
import { ModalContext } from "../../../../../blocks/content/Main";
import { ICounterparty } from "../../../../../interfaces/counterparty";
import { IRequisiteView } from "../../../../../interfaces/requisite";
import { useTypedDispatch } from "../../../../../redux/hooks/hooks";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control";
import { isAllRequisitesFilled } from "../scripts/isAllRequisitesFilled";
import { isInnKppValid } from "../scripts/isInnKppValid";
import { IModals } from "../../../../../blocks/content/hooks/useModals";

export function useCreateOrg(
    // TODO: Как правильно типизировать action?
    action: (object: ICounterparty) => any,
    org: ICounterparty,
    CreateFields: IRequisiteView[]
) {
    const dispatch = useTypedDispatch();
    const { setModalAdd } = useContext<IModals | null>(ModalContext)!;
    const [_, hideModal] = modalManager(setModalAdd);

    async function create(
        event: React.MouseEvent<HTMLButtonElement>,
        org: ICounterparty
    ) {
        event.preventDefault();

        if (isInnKppValid(org) === false) return;
        if (isAllRequisitesFilled(CreateFields) === false) return;
        await dispatch(action(org));
        hideModal();
    }

    return (event: React.MouseEvent<HTMLButtonElement>) => create(event, org);
}
