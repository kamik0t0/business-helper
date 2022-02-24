// загружает данные в зависимости от ForeignKey
export async function getDataByForeignKey(url, idType) {
    /* UserId - запрос организаций пользователя
        OrgsId - запрос контрагентов организации */
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
        case "sales":
            return [await getSalesFromDB(url), "SaleId"];
        case "purchases":
            return [await getPurchasesFromDB(url), "PurchaseId"];
        default:
            break;
    }
}

// запрос на все организации пользователя из БД
export async function getMyOrgsFromDB(url) {
    console.log(url);

    try {
        let getOrgs = await fetch(url);
        let orgs = await getOrgs.json();
        localStorage.setItem("orgs", JSON.stringify(orgs));
        localStorage.removeItem("counterparty");
        console.log(orgs);
        return orgs;
    } catch (error) {
        console.log(`Can't get Orgs from DB - no connection to server`);
    }
}

// запрос контрагентов
export async function getCounterpartiesFromDB(url) {
    try {
        let getcounterparties = await fetch(url);
        let counterparties = await getcounterparties.json();
        localStorage.setItem("counterparties", JSON.stringify(counterparties));
        return counterparties;
    } catch (error) {
        console.log(
            `Can't get counterparties from DB - no connection to server`
        );
    }
}

// запрос продаж
export async function getSalesFromDB(url) {
    console.log("sales");
    try {
        let getSales = await fetch(url);
        let sales = await getSales.json();
        localStorage.setItem("Sales", JSON.stringify(sales));
        return sales;
    } catch (error) {
        console.log(`Can't get sales from DB - no connection to server`);
    }
}
// запрос покупок
export async function getPurchasesFromDB(url) {
    console.log("purchases");
    try {
        let getPurchases = await fetch(url);
        let purchases = await getPurchases.json();
        localStorage.setItem("Purchases", JSON.stringify(purchases));
        return purchases;
    } catch (error) {
        console.log(`Can't get purchases from DB - no connection to server`);
    }
}
