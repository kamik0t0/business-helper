import { useContext } from "react";
import Modal from "../../../UI/modal/modal.jsx";
import { ModalContext } from "../../../blocks/content/Main.jsx";
import CreateOrg from "../../../components/organizations-service/create-org/Create-org.jsx";
import ReadOrg from "../../../components/organizations-service/read-org/Read-org.jsx";
import DeleteOrg from "../../../components/organizations-service/delete-org/Delete-org.jsx";
import PatchOrg from "../../../components/organizations-service/update-org/Patch-org.jsx";

const InlineDelModalStyles = { height: "25vh", width: "40vw" };
const InlineCreateModalStyles = { height: "75vh", width: "75vw" };

export default function OfficeModals() {
    const MODALS = useContext(ModalContext);

    return (
        <>
            {MODALS.modalAdd.show && (
                <Modal
                    size={InlineCreateModalStyles}
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
                    size={InlineDelModalStyles}
                    active={MODALS.modalDelete.add}
                    setActive={MODALS.setModalDelete}
                >
                    <DeleteOrg />
                </Modal>
            )}
        </>
    );
}
