import classes from "./styles/delete-org.module.css";
import Button from "../../../UI/input/Button/Button.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import Buttons from "./service/components/delete-buttons/Delete-buttons.jsx";
import { useDeleteOrg } from "./service/hooks/useDeleteOrg";
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
                    <Button onClick={hideModal}>Закрыть</Button>
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
    isLoading: PropTypes.bool,
};
