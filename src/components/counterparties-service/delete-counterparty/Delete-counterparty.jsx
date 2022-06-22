import { useDispatch, useSelector } from "react-redux";
import classes from "./styles/delete-org.module.css";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import { useDeleteCounterparty } from "./hooks/useDeleteCounterparty";

export default function DeleteCounterparty() {
    const dispatch = useDispatch();
    const COUNTERPARTY = useSelector(
        (state) => state.setCounterpartyReducer.counterparty
    );

    const [loader, hideModal, deleteCounterparty] = useDeleteCounterparty();

    const dispatchDeleteCounterparty = (event) => {
        dispatch(deleteCounterparty(event));
    };

    return (
        <>
            {Object.keys(COUNTERPARTY).length === 0 ? (
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
                    >{`Вы действительно хотите удалить ${COUNTERPARTY.orgname}?`}</div>
                    {loader ? (
                        <Loader />
                    ) : (
                        <div className={classes.buttons}>
                            <MyButton onClick={dispatchDeleteCounterparty}>
                                Yes
                            </MyButton>
                            <MyButton onClick={hideModal}>No</MyButton>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
