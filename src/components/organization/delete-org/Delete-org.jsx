import classes from "./styles/delete-org.module.css";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import Buttons from "./service/components/delete-buttons/Delete-buttons.jsx";
import { useDeleteOrg } from "./service/hooks/useDeleteOrg.js";
import PropTypes from "prop-types";

export default function DeleteOrg({ id, orgname, action, isLoading }) {
    const [deleteOrg, hideModal] = useDeleteOrg(id, action);

    return (
        <>
            {id === null ? (
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
                    >{`Вы действительно хотите удалить ${orgname}?`}</div>
                    {isLoading ? <Loader /> : <Buttons deleteOrg={deleteOrg} />}
                </div>
            )}
        </>
    );
}

DeleteOrg.propTypes = {
    id: PropTypes.number,
    orgname: PropTypes.string,
    action: PropTypes.func,
};
