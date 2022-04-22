import axios from "axios";
import { hideAnimatedModal } from "../../../../UI/modal/service/handlers/modal-control.js";
import { getData } from "../../../../utils/getData.js";

export async function deleteCounterparty(
    setModal,
    setLoader,
    authCheck,
    errorCheck,
    delMyOrg
) {
    setLoader();
    try {
        const counterpartyId = localStorage.getItem("counterpartyId");
        const result = await axios.delete(
            `http://localhost:5600/counterparty/`,
            {
                params: {
                    counterpartyId: counterpartyId,
                },
            }
        );
        if (result.data.deleted) {
            const OrgId = localStorage.getItem("OrgsId");
            const COUNTERPARTIES = await getData(
                `/counterparty/?OrgId=${OrgId}`,
                authCheck
            );
            delMyOrg();
            hideAnimatedModal(setModal);
            setLoader();
            return COUNTERPARTIES;
        }
    } catch (error) {
        setLoader();
        errorCheck();
        hideAnimatedModal(setModal);
        console.log(error.message);
    }
}

// url="https://deploy-test-business-assist.herokuapp.com/private"
