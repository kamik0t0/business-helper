import axios from "axios";
import { getData } from "../../../../utils/getData.js";
import { setOrgsAction } from "../../../../redux/orgs-reducer.js";
import { setErrorTrueAction } from "../../../../redux/error-reducer.js";
import { setMyOrgAction } from "../../../../redux/setMyOrg-reducer.js";
import { setAuth } from "../../../../redux/reducers/authSlice.js";

export function deleteOrg(setLoader) {
    return async function (dispatch) {
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
                dispatch(setAuth(false))
            );
            dispatch(setMyOrgAction({}));
            setLoader();
            dispatch(setOrgsAction(ORGS));
        } catch (error) {
            setLoader();
            dispatch(setErrorTrueAction(true, error.message));
            console.log(error.message);
        }
    };
}

// url="https://deploy-test-business-assist.herokuapp.com/private"
