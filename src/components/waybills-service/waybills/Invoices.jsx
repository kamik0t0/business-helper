import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../blocks/content/Main.jsx";
import Button from "../../../UI/input/Button/Button.jsx";
import Modal from "../../../UI/modal/modal.jsx";
import { modalManager } from "../../../UI/modal/service/handlers/modal-control";
import DeleteInvoice from "../delete-waybill/DeleteInvoice.jsx";
import InteractionHeader from "./header/Interaction-header.jsx";
import InvoiceHeader from "./header/Invoice-header.jsx";
import InvoicesWrapper from "./Invoices-wrapper.jsx";
import { useFilter } from "./service/hooks/useFilter";
import { useSort } from "./service/hooks/useSort";
import classes from "./styles/waybill-list.module.css";

const InlineModalStyles = { height: "25vh", width: "40vw" };

const Invoices = ({ Info, INVOICES, deleteAction }) => {
    const [invoices, setInvoices] = useState([...INVOICES]);
    const sort = useSort(setInvoices, [...invoices]);

    const { modalDelete, modalUpdate, setModalDelete, setModalUpdate } =
        useContext(ModalContext);
    const [_, hideUpdateModal] = modalManager(setModalUpdate);

    const [column, setColumn, filter, startSearch] = useFilter(
        INVOICES,
        setInvoices
    );

    useEffect(() => {
        const filtered = [...INVOICES].filter(
            (invoice) =>
                invoice[column]
                    .toString()
                    .toLowerCase()
                    .search(new RegExp(startSearch, "g")) !== -1
        );
        setInvoices([...filtered]);
    }, [INVOICES]);

    return (
        <>
            <InteractionHeader
                column={column}
                setColumn={setColumn}
                filter={filter}
                info={[Info[1], Info[2]]}
                params={startSearch}
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
                        <Button onClick={hideUpdateModal}>Закрыть</Button>
                    </div>
                </Modal>
            )}
        </>
    );
};
Invoices.propTypes = {
    Info: PropTypes.array.isRequired,
    INVOICES: PropTypes.array.isRequired,
    deleteAction: PropTypes.func.isRequired,
};

export default Invoices;
