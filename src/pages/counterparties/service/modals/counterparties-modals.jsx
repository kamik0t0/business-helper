import React from "react";
import Modal from "../../../../UI/modal/modal.jsx";
import CreateCounterparty from "../../../../components/counterparties-service/create-counterparty/Create-counterparty.jsx";
import ReadCounterparty from "../../../../components/counterparties-service/read-counterparty/Read-counterparty.jsx";
import PatchCounterparty from "../../../../components/counterparties-service/update-counterparty/Patch-counterparty.jsx";
import DeleteCounterparty from "../../../../components/counterparties-service/delete-counterparty/Delete-counterparty.jsx";
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
                    <CreateCounterparty setModal={setModalAdd} />
                </Modal>
            )}
            {modalRead.show && (
                <Modal active={modalRead.add} setActive={setModalRead}>
                    <ReadCounterparty
                        setModal={setModalRead}
                        counterparty={counterparty}
                    />
                </Modal>
            )}
            {modalUpdate.show && (
                <Modal active={modalUpdate.add} setActive={setModalUpdate}>
                    <PatchCounterparty
                        setModal={setModalUpdate}
                        counterparty={counterparty}
                    />
                </Modal>
            )}
            {modalDelete.show && (
                <Modal
                    size={{ height: "25vh", width: "40vw" }}
                    active={modalDelete.add}
                    setActive={setModalDelete}
                >
                    <DeleteCounterparty
                        setModal={setModalDelete}
                        counterparty={counterparty}
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
};
