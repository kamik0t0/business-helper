import { checkInputs } from "../handlers/check-inputs.js";
import { useState, useContext, useRef } from "react";
import { useTypedSelector } from "../../../../../redux/hooks/hooks";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control.js";
import { ModalContext } from "../../../../../blocks/content/Main.jsx";
import { Organizaton } from "../../../../../utils/Org.js";
import { useTypedDispatch } from "../../../../../redux/hooks/hooks";
import { getValue } from "../handlers/get-value.js";
import { setValue } from "../handlers/set-value.js";
import { isOrganization } from "../../../../../utils/isOrg.js";
import { addRequisitesValues } from "../../../handlers/addRequisitesValues.js";

export function usePatchOrg() {
    const dispatch = useTypedDispatch();
    const USERORG = useTypedSelector((state) => state.orgsReducer.org);

    const isORG = useRef(isOrganization(USERORG));
    const UpdateData = useRef(new Organizaton());

    const [loader, setLoader] = useState(false);

    const { setModalUpdate } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalUpdate);

    UpdateData.current["id"] = USERORG.id;

    async function update(event) {
        event.preventDefault();
        if (!checkInputs(UpdateData, USERORG)) return;
        setLoader(!loader);

        // await axios.patch(
        //     process.env.REACT_APP_URL_PRIVATE_OFFICE,
        //     UpdateData.current,
        //     {
        //         params: {
        //             table: "Orgs",
        //         },
        //     }
        // );

        // const ORGS = await getData(
        //     process.env.REACT_APP_URL_PRIVATE_OFFICE,
        //     { table: "Orgs", UserId },
        //     () => dispatch(setAuth(false))
        // );

        // const UpdatedOrg = getUpdatedOrg(ORGS, UpdateData.current.id);

        // dispatch(setMyOrgAction(UpdatedOrg));
        // dispatch(setOrgsAction(ORGS));

        hideModal();
    }

    const getInputValue = (event, field, length) =>
        getValue(event, field, length, UpdateData);

    const setInputValue = (event, field, length) =>
        setValue(event, field, length, UpdateData);

    const Requisites =
        USERORG !== null && addRequisitesValues(USERORG, isORG.current);

    return {
        update,
        USERORG,
        hideModal,
        getInputValue,
        setInputValue,
        Requisites,
        loader,
    };
}
