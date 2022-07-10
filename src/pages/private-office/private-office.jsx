import classes from "./styles/private-office.module.css";
import PrivateOfficeModals from "./service/modals/Private-office-modals.jsx";
import { useTypedSelector } from "../../redux/hooks/hooks";
import { makeOrgsArr } from "../../utils/orgsList.js";
import MySelect from "../../UI/input/MySelect/MySelect.jsx";
import OrgInfo from "./service/org-info.jsx";
import Buttons from "./service/buttons/buttons.jsx";
import { useOffice } from "./service/hooks/useOffice";
import { customInlineStyles } from "./service/utils/styles";
import Loader from "../../UI/Loader/Loader";

export default function Office() {
    const email = useTypedSelector((state) => state.userReducer.data.email);
    const USERORG = useTypedSelector((state) => state.orgsReducer.org);
    const ORGANIZATIONS = useTypedSelector((state) => state.orgsReducer.orgs);
    const OFFICE = useOffice(ORGANIZATIONS);

    return (
        <>
            {OFFICE.loader ? (
                <Loader />
            ) : (
                <div className={classes.content}>
                    <div className={classes.header}>
                        <div className={classes.header_items}>{email}</div>
                    </div>
                    <MySelect
                        styleFieldName={customInlineStyles}
                        id="ORG"
                        multiple={false}
                        defaultValue={["Выбрать организацию"][0]}
                        func={OFFICE.selectUserOrg}
                        options={makeOrgsArr(ORGANIZATIONS)}
                    />
                    {USERORG === null ? (
                        <div className={classes.noorg}>
                            Выберите или добавьте фирму
                        </div>
                    ) : (
                        <OrgInfo />
                    )}
                    <Buttons />
                </div>
            )}
            <PrivateOfficeModals />
        </>
    );
}
