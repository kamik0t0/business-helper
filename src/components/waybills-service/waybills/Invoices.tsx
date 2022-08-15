import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../blocks/content/Main";
import Button from "../../../UI/input/Button/Button";
import Modal from "../../../UI/modal/modal";
import { modalManager } from "../../../UI/modal/service/handlers/modal-control";
import DeleteInvoice from "../delete-waybill/DeleteInvoice";
import InteractionHeader from "./header/Interaction-header";
import InvoiceHeader from "./header/Invoice-header";
import InvoicesWrapper from "./Invoices-wrapper";
import { useFilter } from "./service/hooks/useFilter";
import { useSort } from "./service/hooks/useSort";
import classes from "./styles/waybill-list.module.css";
import { IInvoice } from "../../../interfaces/invoice";

const InlineModalStyles = { height: "25vh", width: "40vw" };

type InvoicesTypes = {
    Info: string[];
    INVOICES: IInvoice[];
    deleteAction: any;
};

const Invoices: React.FC<InvoicesTypes> = ({
    Info,
    INVOICES,
    deleteAction,
}) => {
    const [invoices, setInvoices] = useState<IInvoice[]>([...INVOICES]);
    const sort = useSort(setInvoices, [...invoices]);

    const { modalDelete, modalUpdate, setModalDelete, setModalUpdate } =
        useContext(ModalContext)!;
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
                    setActive={setModalDelete}
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
