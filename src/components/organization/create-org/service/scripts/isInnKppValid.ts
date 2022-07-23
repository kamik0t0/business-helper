// проверка соответствия инн / кпп необходимой длине
import { ICounterparty } from "../../../../../interfaces/counterparty";
import * as consts from "../../../../../utils/consts";

export function isInnKppValid(organization: ICounterparty) {
    if (organization.kpp == null) {
        if (organization.inn?.length === consts.IEinnLength) return true;
    } else if (organization.kpp.length == consts.ORGkppLength) {
        if (organization.inn?.length === consts.ORGinnLength) return true;
    }

    return false;
}
