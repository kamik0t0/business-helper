// выбор организации черезе меню select
export function chooseOrg(event, type) {
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
    let [activeOrg] = JSON.parse(localStorage.getItem("orgs")).filter(
        (object) => object.id === id
    );
    // localStorage активная организация
    localStorage.setItem(type, JSON.stringify(activeOrg));
    // id
    localStorage.setItem("OrgsId", JSON.parse(localStorage.getItem(type)).id);
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
