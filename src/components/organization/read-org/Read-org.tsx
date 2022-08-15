import Button from "../../../UI/input/Button/Button";
import ShowRequisite from "./service/components/ShowRequisite";
import { useReadOrg } from "./service/hooks/useReadOrg";
import classes from "./styles/read-org.module.css";
import { ICounterparty } from "../../../interfaces/counterparty";
import { IOrg } from "../../../interfaces/organization";
import { IRequisiteView } from "../../../interfaces/requisite";

type ReadOrgTypes = {
    org: ICounterparty | IOrg | null;
};

const ReadOrg: React.FC<ReadOrgTypes> = ({ org }) => {
    const [hideModal, OrgData] = useReadOrg(org);
    return (
        <>
            {OrgData === null ? (
                <div className={classes.read}>
                    <div className={classes.noorg}>Организация не выбрана</div>
                </div>
            ) : (
                <div className={classes.read}>
                    <div className={classes.header}>Реквизиты</div>
                    {OrgData.map((requisite: IRequisiteView, index: number) => {
                        return (
                            <ShowRequisite key={index} requisite={requisite} />
                        );
                    })}
                    <div className={classes.buttons}>
                        <Button onClick={hideModal}>EXCEL</Button>
                        <Button onClick={hideModal}>Закрыть</Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ReadOrg;
