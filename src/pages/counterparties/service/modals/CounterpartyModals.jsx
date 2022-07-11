import { useContext } from "react";
import Modal from "../../../../UI/modal/modal.jsx";
import { ModalContext } from "../../../../blocks/content/Main.jsx";
import CreateCounterparty from "../../../../components/counterparties-service/create-counterparty/Create-counterparty.jsx";
import ReadCounterparty from "../../../../components/counterparties-service/read-counterparty/Read-counterparty.jsx";
import PatchCounterparty from "../../../../components/counterparties-service/update-counterparty/Patch-counterparty.jsx";
import DeleteCounterparty from "../../../../components/counterparties-service/delete-counterparty/Delete-counterparty.jsx";

export default function CounterpartyModals() {
    const MODALS = useContext(ModalContext);

    return (
        <>
            {MODALS.modalAdd.show && (
                <Modal
                    size={{ height: "75vh", width: "75vw" }}
                    active={MODALS.modalAdd.add}
                    setActive={MODALS.setModalAdd}
                >
                    <CreateCounterparty />
                </Modal>
            )}
            {MODALS.modalRead.show && (
                <Modal
                    active={MODALS.modalRead.add}
                    setActive={MODALS.setModalRead}
                >
                    <ReadCounterparty />
                </Modal>
            )}
            {MODALS.modalUpdate.show && (
                <Modal
                    active={MODALS.modalUpdate.add}
                    setActive={MODALS.setModalUpdate}
                >
                    <PatchCounterparty />
                </Modal>
            )}
            {MODALS.modalDelete.show && (
                <Modal
                    size={{ height: "25vh", width: "40vw" }}
                    active={MODALS.modalDelete.add}
                    setActive={MODALS.setModalDelete}
                >
                    <DeleteCounterparty />
                </Modal>
            )}
        </>
    );
}
