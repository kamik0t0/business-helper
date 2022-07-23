import { setUserOrg } from "../../../../redux/reducers/orgsSlice";
import { useTypedDispatch } from "../../../../redux/hooks/hooks";
import { getCounterpatiesByOrgId } from "../../../../redux/actions/CounterpartiesAction";
import { getOrgByOrgName } from "../scripts/getOrgIdOrgName.js";
import { getSalesByOrgId } from "../../../../redux/actions/SalesAction";
import { getPurchasesByOrgId } from "../../../../redux/actions/PurchasesAction";

export function useOffice(ORGANIZATIONS) {
    const dispatch = useTypedDispatch();

    async function selectUserOrg(event) {
        event.preventDefault();
        const orgname = event.target.value;
        const [Org] = getOrgByOrgName(ORGANIZATIONS, orgname);

        dispatch(setUserOrg(Org?.id));
        // TODO: LazyLoading
        await dispatch(getCounterpatiesByOrgId(Org?.id));
        await dispatch(getSalesByOrgId(Org?.id));
        await dispatch(getPurchasesByOrgId(Org?.id));
    }

    return { selectUserOrg };
}
