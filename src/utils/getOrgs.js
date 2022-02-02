// запрос на все организации пользователя из БД
export async function getMyOrgsFromDB(url) {
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
// выбор организации
export function chooseOrg(event) {
    let id;
    try {
        let orgname = event.target.value;
        let [org] = JSON.parse(localStorage.getItem("orgs")).filter(
            (object) => object.orgname === orgname
        );
        id = org.id;
    } catch (error) {
        id = event;
    }
    // получили объект с реквизитами выбранной организации
    let [currentOrg] = JSON.parse(localStorage.getItem("orgs")).filter(
        (object) => object.id === id
    );
    // localStorage
    localStorage.setItem("currentOrg", JSON.stringify(currentOrg));
    // currentOrg = JSON.parse(localStorage.getItem("currentOrg"));
    return currentOrg;
}
// проверка относится ли организация к пользователю
export async function isOrgBelongsUser() {
    try {
        if (
            !localStorage
                .getItem("orgs")
                .includes(
                    JSON.parse(localStorage.getItem("currentOrg")).orgname
                )
        ) {
            console.log("remove??");
            localStorage.removeItem("currentOrg");
            return;
        }
    } catch (error) {
        console.log("No current org");
        return;
    }
}
