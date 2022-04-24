import { getData } from "../../../utils/getData.js";
// import { setRegFalseAction } from "../../../redux/auth-reducer.js";
import { setMyOrgAction } from "../../../redux/setMyOrg-reducer.js";
import { setCounterpartiesAction } from "../../../redux/counterparties-reducer.js";
import { setSalesAction } from "../../../redux/sales-reducer.js";
import { setPurchasesAction } from "../../../redux/purchases-reducer.js";
import { chooseMyOrg } from "../../../utils/getOrgs.js";
import { setAuthAction } from "../../../redux/auth-reducer.js";

export function getOrgDataVoid(event, setLoader, ORGS) {
    return async function (dispatch) {
        setLoader();
        const MYORG = chooseMyOrg(event, ORGS);
        const OrgId = localStorage.getItem("OrgsId");

        dispatch(setMyOrgAction(MYORG));
        // контрагенты
        const COUNTERPARTIES = await getData(
            `/counterparty/?OrgId=${OrgId}`,
            () => dispatch(setAuthAction(false))
        );
        // продажи
        const SALES = await getData(`/sales/?OrgId=${OrgId}`, () =>
            dispatch(setAuthAction(false))
        );
        // покупки
        const PURCHASES = await getData(`/purchases/?OrgId=${OrgId}`, () =>
            dispatch(setAuthAction(false))
        );

        dispatch(setCounterpartiesAction(COUNTERPARTIES));
        dispatch(setSalesAction(SALES));
        dispatch(setPurchasesAction(PURCHASES));

        console.log(COUNTERPARTIES);
        console.log(SALES);
        console.log(PURCHASES);

        setLoader();
    };
}
