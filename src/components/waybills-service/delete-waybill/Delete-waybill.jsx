import classes from "./styles/detel-waybill.module.css";
import Loader from "../../../UI/Loader/Loader.jsx";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteWaybill } from "./hooks/useDeleteWaybill.js";

export default function DeleteWaybill() {
    const dispatch = useDispatch();
    const WAYBILL = useSelector((state) => state.setWaybill.waybill);

    const [loader, hideDeleteModal, deleteWaybill] = useDeleteWaybill(
        WAYBILL.id
    );

    const dispatchDeleteWaybill = (event) => dispatch(deleteWaybill(event));
    const slicedDate = WAYBILL.waybill_date.slice(0, -14);

    return (
        <>
            {WAYBILL === undefined ||
            WAYBILL === null ||
            Object.keys(WAYBILL).length === 0 ? (
                <div className={classes.noorg}>
                    <div className={classes.noorg__text}>
                        Накладная не выбрана
                    </div>
                    <MyButton onClick={hideDeleteModal}>Закрыть</MyButton>
                </div>
            ) : (
                <div className={classes.delete}>
                    <div
                        className={classes.text}
                    >{`Вы действительно хотите удалить накладную № ${WAYBILL.id} от ${slicedDate} на ${WAYBILL.total} рублей?`}</div>
                    {loader ? (
                        <Loader />
                    ) : (
                        <div className={classes.buttons}>
                            <MyButton onClick={dispatchDeleteWaybill}>
                                Да
                            </MyButton>
                            <MyButton onClick={hideDeleteModal}>Нет</MyButton>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
