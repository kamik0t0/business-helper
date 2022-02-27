import React, { useState } from "react";
import Modal from "../../../../UI/modal/modal.jsx";
import CreateOrg from "../../../../components/organizations-service/create-org/Create-org.jsx";
import ReadOrg from "../../../../components/organizations-service/read-org/Read-org.jsx";
import PatchOrg from "../../../../components/organizations-service/update-org/Patch-org.jsx";
import DeleteOrg from "../../../../components/organizations-service/delete-org/Delete-org.jsx";
import PropTypes from "prop-types";

export default function PrivateOfficeModals({
    setModalAdd,
    setModalRead,
    setModalUpdate,
    setModalDelete,
    modalAdd,
    modalRead,
    modalUpdate,
    modalDelete,
    isORG,
    myOrg,
    setOrg,
}) {
    const [orgs, setOrgs] = useState();
    return (
        <>
            {modalAdd.show && (
                <Modal
                    size={{ height: "75vh", width: "75vw" }}
                    active={modalAdd.add}
                    setActive={setModalAdd}
                >
                    <CreateOrg
                        setModal={setModalAdd}
                        setOrgs={setOrgs}
                        url="http://localhost:5600/private"
                        // url="https://deploy-test-business-assist.herokuapp.com/private"
                        type="myOrg"
                        idName="UserId"
                    />
                </Modal>
            )}
            {modalRead.show && (
                <Modal active={modalRead.add} setActive={setModalRead}>
                    <ReadOrg
                        setModal={setModalRead}
                        org={myOrg}
                        noselected="Организация не выбрана"
                    />
                </Modal>
            )}
            {modalUpdate.show && (
                <Modal active={modalUpdate.add} setActive={setModalUpdate}>
                    <PatchOrg
                        setModal={setModalUpdate}
                        org={myOrg}
                        setOrg={setOrg}
                        isORG={isORG.current}
                        type="myOrg"
                        noselected="Организация не выбрана"
                        url="http://localhost:5600/private"
                        // url="https://deploy-test-business-assist.herokuapp.com/private"
                        idName="UserId"
                    />
                </Modal>
            )}
            {modalDelete.show && (
                <Modal
                    size={{ height: "25vh", width: "40vw" }}
                    active={modalDelete.add}
                    setActive={setModalDelete}
                >
                    <DeleteOrg
                        setModal={setModalDelete}
                        org={myOrg}
                        setOrgs={setOrgs}
                        type="myOrg"
                        url="http://localhost:5600/private"
                        // url="https://deploy-test-business-assist.herokuapp.com/private"
                        noselected="Организация не выбрана"
                        idName="UserId"
                    />
                </Modal>
            )}
        </>
    );
}

PrivateOfficeModals.propTypes = {
    setModalAdd: PropTypes.func.isRequired,
    setModalRead: PropTypes.func.isRequired,
    setModalUpdate: PropTypes.func.isRequired,
    setModalDelete: PropTypes.func.isRequired,
    modalAdd: PropTypes.object.isRequired,
    modalRead: PropTypes.object.isRequired,
    modalUpdate: PropTypes.object.isRequired,
    modalDelete: PropTypes.object.isRequired,
    isORG: PropTypes.object.isRequired,
    myOrg: PropTypes.object,
    setOrg: PropTypes.func,
};
