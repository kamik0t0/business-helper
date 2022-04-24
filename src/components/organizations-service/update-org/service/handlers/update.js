import { checkInputs } from "./check-inputs.js";
import { showUpdateChanges } from "../../../../../utils/showUpdateChanges.js";
import { getData } from "../../../../../utils/getData.js";
import axios from "axios";
import { setOrgsAction } from "../../../../../redux/orgs-reducer.js";
import { setErrorTrueAction } from "../../../../../redux/error-reducer.js";
// import { setRegFalseAction } from "../../../../../redux/auth-reducer.js";
import { setMyOrgAction } from "../../../../../redux/setMyOrg-reducer.js";
import { setAuthAction } from "../../../../../redux/auth-reducer.js";

export function update(event, Updated, setLoader, MYORG) {
    return async function updateWithThunk(dispatch) {
        event.preventDefault();
        Updated["id"] = MYORG.id;
        // проверка ввода
        if (!checkInputs(Updated, MYORG)) return;
        setLoader();
        try {
            await axios.patch("http://localhost:5600/private/", Updated, {
                params: {
                    table: "Orgs",
                },
            });

            const UserId = localStorage.getItem("UserId");
            const ORGS = await getData(
                `/private/?table=Orgs&UserId=${UserId}`,
                "orgs",
                () => dispatch(setAuthAction(false))
            );

            const UpdatedOrg = showUpdateChanges(ORGS, Updated.id);
            dispatch(setMyOrgAction(UpdatedOrg));
            dispatch(setOrgsAction(ORGS));
        } catch (error) {
            console.log(error);
            dispatch(setErrorTrueAction(true, error.message));
            setLoader();
        }
    };
}
