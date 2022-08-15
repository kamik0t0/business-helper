import { MutableRefObject, useContext, useRef } from "react";
import { ModalContext } from "../../../../../blocks/content/Main";
import { ICounterparty } from "../../../../../interfaces/counterparty";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control";
import { isOrganization } from "../../../../../utils/isOrganization";
import { assignRequisitesValues } from "../../../common/scripts/assignRequisitesValues";
import { IOrg } from "../../../../../interfaces/organization";
import { IRequisiteView } from "../../../../../interfaces/requisite";

export function useReadOrg(org: any): [() => void, IRequisiteView[] | null] {
    const isORG: MutableRefObject<boolean> = useRef(isOrganization(org));
    const { setModalRead } = useContext(ModalContext)!;
    const [_, hideModal] = modalManager(setModalRead);

    const OrgData: IRequisiteView[] | null = assignRequisitesValues(
        org,
        isORG.current
    );

    return [hideModal, OrgData];
}
