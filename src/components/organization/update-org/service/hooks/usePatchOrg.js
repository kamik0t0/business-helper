import { isAnyOrgValueUpdated } from "../handlers/isInputesFilled";
import { useState, useContext, useRef } from "react";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control";
import { ModalContext } from "../../../../../blocks/content/Main.jsx";
import { Organizaton } from "../../../../../utils/Org";
import { useTypedDispatch } from "../../../../../redux/hooks/hooks";
import { setInputLengthLimit } from "../handlers/setInputLengthLimit";
import { setUpdateOrgValue } from "../handlers/setUpdateOrgValue";
import { isOrganization } from "../../../../../utils/isOrg";
import { assignRequisitesValues } from "../../../common/scripts/addRequisitesValues";

export function usePatchOrg(ORG, action) {
    const dispatch = useTypedDispatch();

    const isORG = useRef(isOrganization(ORG));
    const UpdateData = useRef(new Organizaton());

    const [loader, setLoader] = useState(false);

    const { setModalUpdate } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalUpdate);

    UpdateData.current["id"] = ORG?.id;

    async function update(event) {
        event.preventDefault();
        if (!isAnyOrgValueUpdated(UpdateData.current, ORG)) return;
        setLoader(true);
        await dispatch(action(UpdateData.current));

        hideModal();
    }

    const getInputLengthLimit = (event, field, length) =>
        setInputLengthLimit(event, field, length, UpdateData);

    const getUpdateValue = (event, field, length) =>
        setUpdateOrgValue(event, field, length, UpdateData);

    const OrgData = ORG !== null && assignRequisitesValues(ORG, isORG.current);

    return {
        update,
        hideModal,
        getInputLengthLimit,
        getUpdateValue,
        OrgData,
        loader,
    };
}
