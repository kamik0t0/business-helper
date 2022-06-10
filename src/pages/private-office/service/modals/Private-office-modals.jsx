import React, { useContext } from "react";
import Modal from "../../../../UI/modal/modal.jsx";
import CreateOrg from "../../../../components/organizations-service/create-org/Create-org.jsx";
import ReadOrg from "../../../../components/organizations-service/read-org/Read-org.jsx";
import PatchOrg from "../../../../components/organizations-service/update-org/Patch-org.jsx";
import DeleteOrg from "../../../../components/organizations-service/delete-org/Delete-org.jsx";
import { ModalContext } from "../../../../blocks/content/Main.jsx";

export default function PrivateOfficeModals() {
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
                    <CreateOrg />
                </Modal>
            )}
            {modalRead.show && (
                <Modal active={modalRead.add} setActive={setModalRead}>
                    <ReadOrg />
                </Modal>
            )}
            {modalUpdate.show && (
                <Modal active={modalUpdate.add} setActive={setModalUpdate}>
                    <PatchOrg />
                </Modal>
            )}
            {modalDelete.show && (
                <Modal
                    size={{ height: "25vh", width: "40vw" }}
                    active={modalDelete.add}
                    setActive={setModalDelete}
                >
                    <DeleteOrg />
                </Modal>
            )}
        </>
    );
}
