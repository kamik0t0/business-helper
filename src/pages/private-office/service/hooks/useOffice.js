import { setUserOrg } from "../../../../redux/reducers/orgsSlice";
import {
    useTypedSelector,
    useTypedDispatch,
} from "../../../../redux/hooks/hooks";
import { useState } from "react";
import { getCounterpatiesByOrgId } from "../../../../redux/actions/CounterpartiesAction";
import { getOrgIdByOrgName } from "../scripts/getOrgIdByOrgName.js";
import { getSalesByOrgId } from "../../../../redux/actions/SalesAction";
import { getPurchasesByOrgId } from "../../../../redux/actions/PurchasesAction";

export function useOffice(ORGANIZATIONS) {
    const dispatch = useTypedDispatch();
    const [loader, setLoader] = useState(false);

    async function selectUserOrg(event) {
        event.preventDefault();
        const orgname = event.target.value;
        const OrgId = getOrgIdByOrgName(ORGANIZATIONS, orgname);

        setLoader((prev) => !prev);

        dispatch(setUserOrg(orgname));

        await dispatch(getCounterpatiesByOrgId(OrgId));
        await dispatch(getSalesByOrgId(OrgId));
        await dispatch(getPurchasesByOrgId(OrgId));

        setLoader((prev) => !prev);
    }

    return { selectUserOrg, loader, ORGANIZATIONS };
}
