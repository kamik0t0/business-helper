// загружает данные в зависимости от ForeignKey
export async function getDataByForeignKey(url, idType) {
    switch (idType) {
        case "UserId":
            return [
                await getMyOrgsFromDB(
                    `${url}/?${idType}=${localStorage.getItem(idType)}`
                ),
                "OrgsId",
            ];
        case "OrgsId":
            return [
                await getCounterpartiesFromDB(
                    `${url}/?${idType}=${localStorage.getItem(idType)}`
                ),
                "CounterpartyId",
            ];
        default:
            break;
    }
}

// запрос на все организации пользователя из БД
export async function getMyOrgsFromDB(url) {
    console.log(url);
    /* UserId - значит запрос организаций пользователя
        OrgId - значит запрос контрагентов организации */
    try {
        let getOrgs = await fetch(url);
        let orgs = await getOrgs.json();
        localStorage.setItem("orgs", JSON.stringify(orgs));
        console.log(orgs);
        return orgs;
    } catch (error) {
        console.log(`Can't get Orgs from DB - no connection to server`);
    }
}

// запрос контрагентов
export async function getCounterpartiesFromDB(url) {
    console.log(url);
    try {
        let getcounterparties = await fetch(url);
        let counterparties = await getcounterparties.json();
        localStorage.setItem("counterparties", JSON.stringify(counterparties));
        console.log(counterparties);
        return counterparties;
    } catch (error) {
        console.log(
            `Can't get counterparties from DB - no connection to server`
        );
    }
}
