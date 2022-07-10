import { useContext, useEffect } from "react";
import classes from "./styles/waybill-list.module.css";
import Modal from "../../../UI/modal/modal.jsx";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import PropTypes from "prop-types";
import DeleteInvoice from "../delete-waybill/Delete-waybill.jsx";
import { ModalContext } from "../../../blocks/content/Main.jsx";
import { modalManager } from "../../../UI/modal/service/handlers/modal-control.js";
import InvoiceHeader from "./header/Waybill-header.jsx";
import InteractionHeader from "./header/Interaction-header.jsx";
import InvoicesWrapper from "./waybills-wrapper.jsx";
import { useFilter } from "./service/hooks/useFilter";
import { useSort } from "./service/hooks/useSort";

export default function InvoicesList({ CounterpartyInfo, INVOICES, action }) {
    const [column, setColumn, invoices, setInvoices, filter, startSearch] =
        useFilter(INVOICES);
    const sort = useSort(action, [...invoices]);
    const { modalDelete, modalUpdate, setModalDelete, setModalUpdate } =
        useContext(ModalContext);

    const [showUpdateModal, hideUpdateModal] = modalManager(setModalUpdate);

    useEffect(() => {
        setInvoices(INVOICES);
    }, [INVOICES]);

    useEffect(() => {
        // обработка параметров строки запроса - загрузка страницы с выполненной фильтрацией
        if (startSearch) {
            let regexp = new RegExp(startSearch, "g");
            const filtered = [...invoices].filter(
                (invoice) =>
                    invoice[column].toString().toLowerCase().search(regexp) !==
                    -1
            );
            setInvoices(filtered);
        }
    }, [startSearch]);

    return (
        <>
            {
                <>
                    <div className={classes.content}>
                        <InteractionHeader
                            setColumn={setColumn}
                            filter={filter}
                            info={[CounterpartyInfo[1], CounterpartyInfo[2]]}
                            params={startSearch}
                        />
                        <InvoiceHeader sort={sort} info={CounterpartyInfo[0]} />
                        <InvoicesWrapper invoices={invoices} action={action} />
                    </div>
                    {modalDelete.show && (
                        <Modal
                            size={{ height: "25vh", width: "40vw" }}
                            active={modalDelete.add}
                            setModal={setModalDelete}
                        >
                            <DeleteInvoice />
                        </Modal>
                    )}
                    {modalUpdate.show && (
                        <Modal
                            size={{ height: "25vh", width: "40vw" }}
                            active={modalUpdate.add}
                            setActive={setModalUpdate}
                        >
                            <div className={classes.noorg}>
                                <div className={classes.noorg__text}>
                                    Накладная не выбрана
                                </div>
                                <MyButton onClick={hideUpdateModal}>
                                    Закрыть
                                </MyButton>
                            </div>
                        </Modal>
                    )}
                </>
            }
        </>
    );
}

InvoicesList.propTypes = {
    CounterpartyInfo: PropTypes.array.isRequired,
    INVOICES: PropTypes.array.isRequired,
    action: PropTypes.func.isRequired,
};
