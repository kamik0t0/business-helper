import React, { useContext } from "react";
import Modal from "../../../../UI/modal/modal.jsx";
import CreateCounterparty from "../../../../components/counterparties-service/create-counterparty/Create-counterparty.jsx";
import ReadCounterparty from "../../../../components/counterparties-service/read-counterparty/Read-counterparty.jsx";
import PatchCounterparty from "../../../../components/counterparties-service/update-counterparty/Patch-counterparty.jsx";
import DeleteCounterparty from "../../../../components/counterparties-service/delete-counterparty/Delete-counterparty.jsx";
import { ModalContext } from "../../../../blocks/content/Main.jsx";

export default function CounterpartiesModals() {
    const {
        modalAdd,
        modalRead,
        modalUpdate,
        modalDelete,
        setModalAdd,
        setModalRead,
        setModalUpdate,
        setModalDelete,
    } = useContext(ModalContext);
    return (
        <>
            {modalAdd.show && (
                <Modal
                    size={{ height: "75vh", width: "75vw" }}
                    active={modalAdd.add}
                    setActive={setModalAdd}
                >
                    <CreateCounterparty />
                </Modal>
            )}
            {modalRead.show && (
                <Modal active={modalRead.add} setActive={setModalRead}>
                    <ReadCounterparty />
                </Modal>
            )}
            {modalUpdate.show && (
                <Modal active={modalUpdate.add} setActive={setModalUpdate}>
                    <PatchCounterparty />
                </Modal>
            )}
            {modalDelete.show && (
                <Modal
                    size={{ height: "25vh", width: "40vw" }}
                    active={modalDelete.add}
                    setActive={setModalDelete}
                >
                    <DeleteCounterparty />
                </Modal>
            )}
        </>
    );
}
