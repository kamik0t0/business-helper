import classes from "./styles/read-org.module.css";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import Requisite from "./service/components/ReqField.jsx";
import { useReadOrg } from "./service/hooks/useReadOrg";

export default function ReadOrg() {
    const [hideModal, Requisites] = useReadOrg();

    return (
        <>
            {Requisites === null ? (
                <div className={classes.read}>
                    <div className={classes.noorg}>Организация не выбрана</div>
                </div>
            ) : (
                <div className={classes.read}>
                    <div className={classes.header}>Реквизиты</div>
                    {Requisites.map((requisite, index) => {
                        return <Requisite key={index} requisite={requisite} />;
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
