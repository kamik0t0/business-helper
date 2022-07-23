import { useRef, useContext } from "react";
import { assignRequisitesValues } from "../../../common/scripts/assignRequisitesValues.ts";
import { ModalContext } from "../../../../../blocks/content/Main";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control";
import { isOrganization } from "../../../../../utils/isOrganization";

export function useReadOrg(ORG) {
    const isORG = useRef(isOrganization(ORG));
    const { setModalRead } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalRead);
    // если выбрана организация, то добавляются значения реквизитов
    const OrgData = assignRequisitesValues(ORG, isORG.current);

    return [hideModal, OrgData];
}
