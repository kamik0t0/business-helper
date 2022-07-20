import classes from "./styles/detel-waybill.module.css";
import Loader from "../../../UI/Loader/Loader.jsx";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import { useTypedSelector } from "../../../redux/hooks/hooks";
import { useDeleteWaybill } from "./hooks/useDeleteWaybill.js";

export default function DeleteInvoice({ deleteAction }) {
    const INVOICE = useTypedSelector((state) => state.invoicesReducer.Invoice);
    const { isLoading } = useTypedSelector((state) => state.invoicesReducer);

    const [hideDeleteModal, deleteInvoice] = useDeleteWaybill(
        INVOICE.id,
        deleteAction
    );

    const slicedDate = INVOICE.waybill_date.slice(0, -14);

    return (
        <>
            {INVOICE == null || Object.keys(INVOICE).length === 0 ? (
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
                    >{`Вы действительно хотите удалить накладную № ${INVOICE.id} от ${slicedDate} на ${INVOICE.total} рублей?`}</div>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <div className={classes.buttons}>
                            <MyButton onClick={deleteInvoice}>Да</MyButton>
                            <MyButton onClick={hideDeleteModal}>Нет</MyButton>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
