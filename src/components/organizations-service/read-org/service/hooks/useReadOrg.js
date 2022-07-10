import { useRef, useContext } from "react";
import { addRequisitesValues } from "../../../handlers/addRequisitesValues";
import { useTypedSelector } from "../../../../../redux/hooks/hooks";
import { ModalContext } from "../../../../../blocks/content/Main";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control";
import { isOrganization } from "../../../../../utils/isOrg";

export function useReadOrg() {
    const USERORG = useTypedSelector((state) => state.orgsReducer.org);
    const isORG = useRef(isOrganization(USERORG));
    const { setModalRead } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalRead);
    // если выбрана организация, то добавляются значения реквизитов
    const Requisites = addRequisitesValues(USERORG, isORG.current);

    return [hideModal, Requisites];
}
