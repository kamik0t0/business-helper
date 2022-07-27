import PropTypes from "prop-types";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import ShowRequisite from "./service/components/ShowRequisite.jsx";
import { useReadOrg } from "./service/hooks/useReadOrg";
import classes from "./styles/read-org.module.css";

export default function ReadOrg({ org }) {
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
                    {OrgData.map((requisite, index) => {
                        return (
                            <ShowRequisite key={index} requisite={requisite} />
                        );
                    })}
                    <div className={classes.buttons}>
                        <MyButton onClick={hideModal}>EXCEL</MyButton>
                        <MyButton onClick={hideModal}>Закрыть</MyButton>
                    </div>
                </div>
            )}
        </>
    );
}

ReadOrg.propTypes = {
    org: PropTypes.object,
};
