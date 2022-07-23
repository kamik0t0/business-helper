import { useContext, useRef, MutableRefObject } from "react";
import { ModalContext } from "../../../../../blocks/content/Main.jsx";
import { ICounterpartyWithInputValueLength } from "../../../../../interfaces/counterparty";
import { IEvent } from "../../../../../interfaces/event";
import { useTypedDispatch } from "../../../../../redux/hooks/hooks";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control";
import { isAnyOrgValueUpdated } from "../handlers/isAnyOrgValueUpdated";

export function usePatchOrg(
    org: ICounterpartyWithInputValueLength,
    action: any,
    UpdateData: MutableRefObject<ICounterpartyWithInputValueLength>
) {
    const dispatch = useTypedDispatch();
    const { setModalUpdate } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalUpdate);

    async function update(event: IEvent) {
        event.preventDefault();
        if (!isAnyOrgValueUpdated(UpdateData, org))
            return alert("Измените хотя бы одно поле!");
        await dispatch(action(UpdateData.current));
        hideModal();
    }

    return {
        update,
        hideModal,
    };
}
