import { useContext, useEffect } from "react";
import classes from "./styles/waybill-list.module.css";
import Modal from "../../../UI/modal/modal.jsx";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import PropTypes from "prop-types";
import DeleteInvoice from "../delete-waybill/DeleteInvoice.jsx";
import { ModalContext } from "../../../blocks/content/Main.jsx";
import { modalManager } from "../../../UI/modal/service/handlers/modal-control";
import InvoiceHeader from "./header/Invoice-header.jsx";
import InteractionHeader from "./header/Interaction-header.jsx";
import InvoicesWrapper from "./waybills-wrapper.jsx";
import { useSort } from "./service/hooks/useSort";
import { useTypedSelector } from "../../../redux/hooks/hooks";

const InlineModalStyles = { height: "25vh", width: "40vw" };

const Invoices = ({
    Info,
    invoices,
    setInvoices,
    startSearch,
    column,
    setColumn,
    filter,
    deleteAction,
}) => {
    const { Invoice } = useTypedSelector((state) => state.invoicesReducer);

    const sort = useSort(setInvoices, [...invoices]);

    const { modalDelete, modalUpdate, setModalDelete, setModalUpdate } =
        useContext(ModalContext);

    const [_, hideUpdateModal] = modalManager(setModalUpdate);

    useEffect(() => {
        // обработка параметров строки запроса - загрузка страницы с выполненной фильтрацией
        let regexp = new RegExp(startSearch, "g");
        const filtered = invoices.filter(
            (invoice) =>
                invoice[column].toString().toLowerCase().search(regexp) !== -1
        );
        setInvoices(filtered);
    }, []);

    return (
        <>
            <InteractionHeader
                setColumn={setColumn}
                filter={filter}
                info={[Info[1], Info[2]]}
                params={startSearch}
                INVOICE={Invoice}
                column={column}
            />
            <InvoiceHeader sort={sort} info={Info[0]} />
            <InvoicesWrapper invoices={invoices} action={setInvoices} />

            {modalDelete.show && (
                <Modal
                    size={InlineModalStyles}
                    active={modalDelete.add}
                    setModal={setModalDelete}
                >
                    <DeleteInvoice deleteAction={deleteAction} />
                </Modal>
            )}
            {modalUpdate.show && (
                <Modal
                    size={InlineModalStyles}
                    active={modalUpdate.add}
                    setActive={setModalUpdate}
                >
                    <div className={classes.noorg}>
                        <div className={classes.noorg__text}>
                            Накладная не выбрана
                        </div>
                        <MyButton onClick={hideUpdateModal}>Закрыть</MyButton>
                    </div>
                </Modal>
            )}
        </>
    );
};
Invoices.propTypes = {
    Info: PropTypes.array.isRequired,
    invoices: PropTypes.array.isRequired,
    setInvoices: PropTypes.func.isRequired,
    startSearch: PropTypes.string,
    column: PropTypes.string,
    setColumn: PropTypes.func.isRequired,
    filter: PropTypes.func.isRequired,
    deleteAction: PropTypes.func.isRequired,
};

export default Invoices;
