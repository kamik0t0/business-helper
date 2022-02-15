import React from "react";
import Modal from "../../../../UI/modal/modal.jsx";
import CreateOrg from "../../../../components/organizations-service/create-org/Create-org.jsx";
import ReadOrg from "../../../../components/organizations-service/read-org/Read-org.jsx";
import PatchOrg from "../../../../components/organizations-service/update-org/Patch-org.jsx";
import DeleteOrg from "../../../../components/organizations-service/delete-org/Delete-org.jsx";
import PropTypes from "prop-types";

export default function CounterpartiesModals({
    setModalAdd,
    setModalRead,
    setModalUpdate,
    setModalDelete,
    modalAdd,
    modalRead,
    modalUpdate,
    modalDelete,
    isORG,
    setCounterparties,
    counterparty,
}) {
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
                        setOrgs={setCounterparties}
                        url="http://localhost:5600/counterparty"
                        // url="https://deploy-test-business-assist.herokuapp.com/counterparty"
                        type="counterparty"
                        idType="OrgsId"
                    />
                </Modal>
            )}
            {modalRead.show && (
                <Modal active={modalRead.add} setActive={setModalRead}>
                    <ReadOrg
                        setModal={setModalRead}
                        org={counterparty}
                        noselected="Организация не выбрана"
                    />
                </Modal>
            )}
            {modalUpdate.show && (
                <Modal active={modalUpdate.add} setActive={setModalUpdate}>
                    <PatchOrg
                        setModal={setModalUpdate}
                        org={counterparty}
                        setOrg={setCounterparties}
                        isORG={isORG.current}
                        type="counterparty"
                        noselected="Организация не выбрана"
                        url="http://localhost:5600/counterparty"
                        // url="https://deploy-test-business-assist.herokuapp.com/counterparty"
                        idType="OrgsId"
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
                        org={counterparty}
                        setOrgs={setCounterparties}
                        type="counterparty"
                        url="http://localhost:5600/counterparty"
                        // url="https://deploy-test-business-assist.herokuapp.com/counterparty"
                        noselected="Организация не выбрана"
                        idType="OrgsId"
                    />
                </Modal>
            )}
        </>
    );
}

CounterpartiesModals.propTypes = {
    setModalAdd: PropTypes.func.isRequired,
    setModalRead: PropTypes.func.isRequired,
    setModalUpdate: PropTypes.func.isRequired,
    setModalDelete: PropTypes.func.isRequired,
    modalAdd: PropTypes.object.isRequired,
    modalRead: PropTypes.object.isRequired,
    modalUpdate: PropTypes.object.isRequired,
    modalDelete: PropTypes.object.isRequired,
    isORG: PropTypes.object.isRequired,
    counterparty: PropTypes.object,
    setCounterparties: PropTypes.func.isRequired,
};
