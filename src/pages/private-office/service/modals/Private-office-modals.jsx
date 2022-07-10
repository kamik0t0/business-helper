import { useContext } from "react";
import Modal from "../../../../UI/modal/modal.jsx";
import CreateOrg from "../../../../components/organizations-service/create-org/Create-org.jsx";
import ReadOrg from "../../../../components/organizations-service/read-org/Read-org.jsx";
import PatchOrg from "../../../../components/organizations-service/update-org/Patch-org.jsx";
import DeleteOrg from "../../../../components/organizations-service/delete-org/Delete-org.jsx";
import { ModalContext } from "../../../../blocks/content/Main.jsx";

export default function PrivateOfficeModals() {
    const MODALS = useContext(ModalContext);

    return (
        <>
            {MODALS.modalAdd.show && (
                <Modal
                    size={{ height: "75vh", width: "75vw" }}
                    active={MODALS.modalAdd.add}
                    setActive={MODALS.setModalAdd}
                >
                    <CreateOrg />
                </Modal>
            )}
            {MODALS.modalRead.show && (
                <Modal
                    active={MODALS.modalRead.add}
                    setActive={MODALS.setModalRead}
                >
                    <ReadOrg />
                </Modal>
            )}
            {MODALS.modalUpdate.show && (
                <Modal
                    active={MODALS.modalUpdate.add}
                    setActive={MODALS.setModalUpdate}
                >
                    <PatchOrg />
                </Modal>
            )}
            {MODALS.modalDelete.show && (
                <Modal
                    size={{ height: "25vh", width: "40vw" }}
                    active={MODALS.modalDelete.add}
                    setActive={MODALS.setModalDelete}
                >
                    <DeleteOrg />
                </Modal>
            )}
        </>
    );
}
