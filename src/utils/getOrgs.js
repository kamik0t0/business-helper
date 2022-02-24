// выбор организации черезе меню select
export function chooseOrg(event, type, dispatch) {
    // когда мы выбираем организацию, то загружаем её контрагентов, и накладные
    console.log(type);
    let orgname = event.target.value;
    let [org] = JSON.parse(localStorage.getItem("orgs")).filter(
        (object) => object.orgname === orgname
    );
    let id = org.id;
    // получили объект с реквизитами выбранной организации
    let [activeOrg] = JSON.parse(localStorage.getItem("orgs")).filter(
        (org) => org.id === id
    );
    // localStorage активная организация
    localStorage.setItem(type, JSON.stringify(activeOrg));
    // id
    localStorage.setItem("OrgsId", JSON.parse(localStorage.getItem(type)).id);
    localStorage.removeItem("counterparty");
    dispatch({
        type: "isMYORGSELECTED_TRUE",
        payload: true,
    });
    return activeOrg;
}
// проверка относится ли организация к пользователю
export async function isOrgBelongsUser() {
    try {
        if (
            !localStorage
                .getItem("orgs")
                .includes(JSON.parse(localStorage.getItem("activeOrg")).orgname)
        ) {
            console.log("remove??");
            localStorage.removeItem("activeOrg");
            return;
        }
    } catch (error) {
        console.log("No current org");
        return;
    }
}
