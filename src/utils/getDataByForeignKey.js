// загружает данные в зависимости от ForeignKey
export async function getDataByForeignKey(url, idName) {
    console.log(url, idName);
    /* UserId - запрос организаций пользователя
        OrgsId - запрос контрагентов организации */
    switch (idName) {
        case "UserId":
            return [
                await getMyOrgsFromDB(
                    `${url.slice(0, 29)}/?UserId=${localStorage.getItem(
                        idName
                    )}`
                ),
                "OrgsId",
            ];
        case "OrgsId":
            return [
                await getCounterpartiesFromDB(
                    `${url.slice(0, 34)}/?OrgId=${localStorage.getItem(idName)}`
                ),
                "CounterpartyId",
            ];
        case "sales":
            return [await getSalesFromDB(url), "SaleId"];
        case "purchases":
            return [await getPurchasesFromDB(url), "PurchaseId"];
        case "sales_items":
            return [await getSaleItemsFromDB(url), "SaleId"];
        case "purchases_items":
            return [await getPurchaseItemsFromDB(url), "PurchaseId"];
        default:
            break;
    }
}

// запрос на все организации пользователя из БД
export async function getMyOrgsFromDB(url) {
    console.log(url);

    try {
        let orgs = await (await fetch(url)).json();
        console.log(orgs);
        localStorage.setItem("orgs", JSON.stringify(orgs));
        localStorage.removeItem("counterparty");

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
        return counterparties;
    } catch (error) {
        console.log(
            `Can't get counterparties from DB - no connection to server`
        );
    }
}

// запрос продаж
export async function getSalesFromDB(url) {
    try {
        console.log(url);
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
    try {
        let getPurchases = await fetch(url);
        let purchases = await getPurchases.json();
        localStorage.setItem("Purchases", JSON.stringify(purchases));
        return purchases;
    } catch (error) {
        console.log(`Can't get purchases from DB - no connection to server`);
    }
}
// запрос продаж
export async function getSaleItemsFromDB(url) {
    console.log("sales_items");
    try {
        let getSaleItems = await fetch(url);
        let sale_items = await getSaleItems.json();
        console.log(sale_items);
        localStorage.setItem("Sale_items", JSON.stringify(sale_items));
        return sale_items;
    } catch (error) {
        console.log(error);
        console.log(`Can't get sale_items from DB - no connection to server`);
    }
}
// запрос покупок
export async function getPurchaseItemsFromDB(url) {
    console.log("purchases_items");
    try {
        let getPurchaseItems = await fetch(url);
        let purchase_items = await getPurchaseItems.json();
        localStorage.setItem("Purchase_items", JSON.stringify(purchase_items));
        return purchase_items;
    } catch (error) {
        console.log(
            `Can't get purchase_items from DB - no connection to server`
        );
    }
}
