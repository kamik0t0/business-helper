import classes from "./styles/detel-waybill.module.css";
import Loader from "../../../UI/Loader/Loader";
import Button from "../../../UI/input/Button/Button";
import { useTypedSelector } from "../../../redux/hooks/hooks";
import { useDeleteInvoice } from "./hooks/useDeleteInvoice";

type DeleteInvoiceTypes = {
    deleteAction: () => void;
};

const DeleteInvoice: React.FC<DeleteInvoiceTypes> = ({ deleteAction }) => {
    const { Invoice } = useTypedSelector((state) => state.invoicesReducer);
    const { isLoading } = useTypedSelector((state) => state.invoicesReducer);

    const [hideDeleteModal, deleteInvoice] = useDeleteInvoice(
        Invoice?.id,
        deleteAction
    );

    const slicedDate = Invoice?.waybill_date?.slice(0, -14);

    return (
        <>
            {Invoice === null ? (
                <div className={classes.noorg}>
                    <div className={classes.noorg__text}>
                        Накладная не выбрана
                    </div>
                    <Button onClick={hideDeleteModal}>Закрыть</Button>
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
                            <Button onClick={deleteInvoice}>Да</Button>
                            <Button onClick={hideDeleteModal}>Нет</Button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};
export default DeleteInvoice;
