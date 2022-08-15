import { useContext } from "react";
import { ModalContext } from "../../../../../blocks/content/Main";
import { ICounterparty } from "../../../../../interfaces/counterparty";
import { useTypedDispatch } from "../../../../../redux/hooks/hooks";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control";
import { isAnyOrgValueUpdated } from "../handlers/isAnyOrgValueUpdated";

export function usePatchOrg(
    currentOrgReqs: ICounterparty | null,
    newOrgReqs: ICounterparty | null,
    action: any
) {
    const dispatch = useTypedDispatch();
    const { setModalUpdate } = useContext(ModalContext)!;
    const [, hideModal] = modalManager(setModalUpdate);

    const update = async (
        event: React.ChangeEvent<HTMLButtonElement>
    ): Promise<void> => {
        event.preventDefault();
        if (!isAnyOrgValueUpdated(newOrgReqs, currentOrgReqs))
            alert("Измените хотя бы одно поле!");
        await dispatch(action(newOrgReqs));
        hideModal();
    };

    return {
        update,
        hideModal,
    };
}
