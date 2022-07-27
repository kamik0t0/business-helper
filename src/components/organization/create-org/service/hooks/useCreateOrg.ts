import { MutableRefObject, useContext } from "react";
import { ModalContext } from "../../../../../blocks/content/Main";
import {
    ICounterparty,
    ICounterpartyWithInputValueLength,
} from "../../../../../interfaces/counterparty";
import { IEvent } from "../../../../../interfaces/event";
import { useTypedDispatch } from "../../../../../redux/hooks/hooks";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control";
import { isAllRequisitesFilled } from "../scripts/isAllRequisitesFilled";
import { isInnKppValid } from "../scripts/isInnKppValid";

export function useCreateOrg(
    // TODO: Как правильно типизировать action?
    action: (object: ICounterpartyWithInputValueLength) => any,
    org: MutableRefObject<ICounterpartyWithInputValueLength>
) {
    const dispatch = useTypedDispatch();
    const { setModalAdd } = useContext(ModalContext);
    const [_, hideModal] = modalManager(setModalAdd);

    async function create(event: IEvent, org: ICounterparty) {
        event.preventDefault();

        if (isInnKppValid(org) === false) return;
        if (isAllRequisitesFilled(org) === false) return;
        await dispatch(action(org));
        hideModal();
    }

    return (event: IEvent) => create(event, org.current);
}
