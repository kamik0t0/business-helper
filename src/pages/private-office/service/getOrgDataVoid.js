import { getData } from "../../../utils/getData.js";
import { setMyOrgAction } from "../../../redux/setMyOrg-reducer.js";
import { setCounterpartiesAction } from "../../../redux/counterparties-reducer.js";
import { setSalesAction } from "../../../redux/sales-reducer.js";
import { setPurchasesAction } from "../../../redux/purchases-reducer.js";
import { chooseMyOrg } from "../../../utils/getOrgs.js";
import { setAuthAction } from "../../../redux/auth-reducer.js";
// import { setWaybillsAction } from "../../../redux/waybills-reducer.js";

export function getOrgDataVoid(event, setLoader, ORGS) {
    return async function (dispatch) {
        setLoader();
        const MYORG = chooseMyOrg(event, ORGS);
        dispatch(setMyOrgAction(MYORG));
        const OrgId = localStorage.getItem("OrgsId");

        const URLS = [
            `/counterparty/?OrgId=${OrgId}`,
            `/sales/?OrgId=${OrgId}`,
            `/purchases/?OrgId=${OrgId}`,
        ];
        const ACTIONS = [
            setCounterpartiesAction,
            setSalesAction,
            setPurchasesAction,
        ];

        let requests = URLS.map((url) =>
            getData(url, () => dispatch(setAuthAction(false)))
        );

        Promise.all(requests).then((responses) => {
            for (let i = 0; i < responses.length; i++) {
                let action = ACTIONS[i](responses[i]);
                dispatch(action);
            }
        });
        setLoader();
    };
}
