import axios from "axios";
import { hideAnimatedModal } from "../../../../UI/modal/service/handlers/modal-control.js";
import { getData } from "../../../../utils/getData.js";
import { setOrgsAction } from "../../../../redux/orgs-reducer.js";
import { setErrorTrueAction } from "../../../../redux/error-reducer.js";
import { setRegFalseAction } from "../../../../redux/auth-reducer.js";
import { setMyOrgAction } from "../../../../redux/setMyOrg-reducer.js";

export function deleteOrg(setModal, setLoader) {
    return async function deleteWithThunk(dispatch) {
        setLoader();
        try {
            const UserId = localStorage.getItem("UserId");
            const OrgId = localStorage.getItem("OrgsId");

            await axios.delete(`http://localhost:5600/private`, {
                params: {
                    orgId: OrgId,
                    table: "Orgs",
                },
            });

            const ORGS = await getData(`/private/?UserId=${UserId}`, () =>
                dispatch(setRegFalseAction(false))
            );
            dispatch(setMyOrgAction({}));
            hideAnimatedModal(setModal);
            setLoader();
            dispatch(setOrgsAction(ORGS));
        } catch (error) {
            setLoader();
            dispatch(setErrorTrueAction(true, error.message));
            hideAnimatedModal(setModal);
            console.log(error.message);
        }
    };
}

// url="https://deploy-test-business-assist.herokuapp.com/private"
