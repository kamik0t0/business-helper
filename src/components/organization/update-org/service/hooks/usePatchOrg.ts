import { useContext } from "react";
import { ModalContext } from "../../../../../blocks/content/Main.jsx";
import { ICounterparty } from "../../../../../interfaces/counterparty";
import { IEvent } from "../../../../../interfaces/event";
import { useTypedDispatch } from "../../../../../redux/hooks/hooks";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control";
import { isAnyOrgValueUpdated } from "../handlers/isAnyOrgValueUpdated";

export function usePatchOrg(
    currentOrgReqs: ICounterparty,
    newOrgReqs: ICounterparty,
    action: any
) {
    const dispatch = useTypedDispatch();
    const { setModalUpdate } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalUpdate);

    async function update(event: IEvent) {
        event.preventDefault();
        if (!isAnyOrgValueUpdated(newOrgReqs, currentOrgReqs))
            return alert("Измените хотя бы одно поле!");
        await dispatch(action(newOrgReqs));
        hideModal();
    }

    return {
        update,
        hideModal,
    };
}
