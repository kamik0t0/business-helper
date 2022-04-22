import axios from "axios";
import { getData } from "../../../../utils/getData.js";

// создание накладной
export async function create(
    event,
    path,
    WAYBILL,
    positions,
    setNavToList,
    errorCheck
) {
    event.preventDefault();
    WAYBILL.current["positions"] = positions;
    const OrgId = localStorage.getItem("OrgsId");
    WAYBILL.current["OrgId"] = OrgId;
    try {
        const response = await axios.post(
            `http://localhost:5600${path}/`,
            WAYBILL.current,
            {
                params: {
                    table: path.slice(1),
                    OrgId: OrgId,
                    CounterpartyId: localStorage.getItem("counterpartyId"),
                },
            }
        );
        if (response.data.created) {
            const result = await getData(`${path}/?OrgId=${OrgId}`, errorCheck);
            setNavToList();
            return result;
        }
    } catch (error) {
        console.log(error);
    }
}
