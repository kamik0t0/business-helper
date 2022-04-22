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
        console.log(error.message);
        return;
    }
}
