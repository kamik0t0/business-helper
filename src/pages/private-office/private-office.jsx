import classes from "./styles/private-office.module.css";
import CRUDModals from "../../components/organization/common/components/CRUD-Modals";
import { useTypedSelector } from "../../redux/hooks/hooks";
import { makeOrgsArr } from "../../utils/orgsList.js";
import MySelect from "../../UI/input/MySelect/MySelect.jsx";
import OrgInfo from "./service/org-info.jsx";
import Buttons from "./service/buttons/buttons.jsx";
import { useOffice } from "./service/hooks/useOffice";
import { customInlineStyles } from "./service/utils/styles";
import Loader from "../../UI/Loader/Loader";

const Office = () => {
    const { org } = useTypedSelector((state) => state.orgsReducer);
    const { orgs } = useTypedSelector((state) => state.orgsReducer);
    const OFFICE = useOffice(orgs);

    return (
        <>
            <MySelect
                styleFieldName={customInlineStyles}
                id="ORG"
                multiple={false}
                defaultValue={["Выбрать организацию"][0]}
                func={OFFICE.selectUserOrg}
                options={makeOrgsArr(orgs)}
            />
            {org === null ? (
                <div className={classes.noorg}>Выберите или добавьте фирму</div>
            ) : OFFICE.loader ? (
                <Loader />
            ) : (
                <OrgInfo USERORG={org} />
            )}
            <Buttons />
            <CRUDModals />
        </>
    );
};

export default Office;
