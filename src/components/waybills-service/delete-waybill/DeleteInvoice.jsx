import classes from "./styles/detel-waybill.module.css";
import Loader from "../../../UI/Loader/Loader.jsx";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import { useTypedSelector } from "../../../redux/hooks/hooks";
import { useDeleteWaybill } from "./hooks/useDeleteWaybill.js";

export default function DeleteInvoice({ deleteAction }) {
    const { Invoice } = useTypedSelector((state) => state.invoicesReducer);
    const { isLoading } = useTypedSelector((state) => state.invoicesReducer);

    const [hideDeleteModal, deleteInvoice] = useDeleteWaybill(
        Invoice?.id,
        deleteAction
    );

    const slicedDate = Invoice?.waybill_date.slice(0, -14);

    return (
        <>
            {Invoice === null ? (
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
                    >{`Вы действительно хотите удалить накладную № ${Invoice.id} от ${slicedDate} на ${Invoice.total} рублей?`}</div>
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
