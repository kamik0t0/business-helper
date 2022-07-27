import { useMemo } from "react";
import Modals from "../../components/organization/common/components/CRUD-Modals";
import { useTypedSelector } from "../../redux/hooks/hooks";
import OrganizationSelect from "../../UI/input/OfficeSelect/OrganizationSelect";
import Loader from "../../UI/Loader/Loader";
import { makeOrgsArr } from "../../utils/orgsList";
import Buttons from "./service/buttons/buttons.jsx";
import { useOffice } from "./service/hooks/useOffice";
import OrgInfo from "./service/org-info.jsx";
import classes from "./styles/private-office.module.css";

const Office = () => {
    const { org, orgs } = useTypedSelector((state) => state.orgsReducer);
    const { isLoading } = useTypedSelector((state) => state.invoicesReducer);

    const selectUserOrg = useOffice(orgs);

    const options = useMemo(() => makeOrgsArr(orgs), [orgs]);

    return (
        <>
            <OrganizationSelect
                defaultValue={"Выбрать организацию"}
                selectUserOrg={selectUserOrg}
                options={options}
            />
            {org === null ? (
                <div className={classes.noorg}>Выберите или добавьте фирму</div>
            ) : isLoading ? (
                <Loader />
            ) : (
                <OrgInfo USERORG={org} />
            )}
            <Buttons />
            <Modals />
        </>
    );
};

export default Office;
