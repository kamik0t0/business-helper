import { MutableRefObject, useContext, useRef } from "react";
import { ModalContext } from "../../../../../blocks/content/Main";
import { ICounterparty } from "../../../../../interfaces/counterparty";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control";
import { isOrganization } from "../../../../../utils/isOrganization";
import { assignRequisitesValues } from "../../../common/scripts/assignRequisitesValues";

export function useReadOrg(org: ICounterparty) {
    const isORG: MutableRefObject<boolean> = useRef(isOrganization(org));
    const { setModalRead } = useContext(ModalContext);
    const [_, hideModal] = modalManager(setModalRead);

    const OrgData = assignRequisitesValues(org, isORG.current);

    return [hideModal, OrgData];
}
