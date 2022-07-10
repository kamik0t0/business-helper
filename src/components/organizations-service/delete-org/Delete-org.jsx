import classes from "./styles/delete-org.module.css";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import Buttons from "./service/components/delete-buttons/Delete-buttons.jsx";
import { useDeleteOrg } from "./service/hooks/useDeleteOrg.js";

export default function DeleteOrg() {
    const [loader, deleteOrg, hideModal, USERORG] = useDeleteOrg();
    return (
        <>
            {USERORG === null ? (
                <div className={classes.noorg}>
                    <div className={classes.noorg__text}>
                        Организация не выбрана
                    </div>
                    <MyButton onClick={hideModal}>Закрыть</MyButton>
                </div>
            ) : (
                <div className={classes.delete}>
                    <div
                        className={classes.text}
                    >{`Вы действительно хотите удалить ${USERORG.orgname}?`}</div>
                    {loader ? <Loader /> : <Buttons deleteOrg={deleteOrg} />}
                </div>
            )}
        </>
    );
}
