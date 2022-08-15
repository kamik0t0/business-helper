import { getCounterpatiesByOrgId } from "../../../../redux/actions/CounterpartiesAction";
import { getPurchasesByOrgId } from "../../../../redux/actions/PurchasesAction";
import { getSalesByOrgId } from "../../../../redux/actions/SalesAction";
import { useTypedDispatch } from "../../../../redux/hooks/hooks";
import { setUserOrg } from "../../../../redux/reducers/orgsSlice";
import { getOrgByOrgName } from "../scripts/getOrgIdOrgName";
import { IOrg } from "../../../../interfaces/organization";
import React from "react";

export function useOffice(orgs: IOrg[]) {
    const dispatch = useTypedDispatch();

    async function selectUserOrg(event: React.ChangeEvent<HTMLSelectElement>) {
        event.preventDefault();
        const orgname = event.target.value as string;
        const [Org] = getOrgByOrgName(orgs, orgname);

        dispatch(setUserOrg(Org?.id));
        // TODO: LazyLoading
        await dispatch(getCounterpatiesByOrgId(Org?.id));
        await dispatch(getSalesByOrgId(Org?.id));
        await dispatch(getPurchasesByOrgId(Org?.id));
    }

    return selectUserOrg;
}
