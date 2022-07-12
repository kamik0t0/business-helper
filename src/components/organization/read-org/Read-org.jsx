import classes from "./styles/read-org.module.css";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import ShowRequisite from "./service/components/ShowRequisite.jsx";
import { useReadOrg } from "./service/hooks/useReadOrg";
import PropTypes from "prop-types";

export default function ReadOrg({ ORG }) {
    const [hideModal, OrgData] = useReadOrg(ORG);
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
    ORG: PropTypes.object,
};
