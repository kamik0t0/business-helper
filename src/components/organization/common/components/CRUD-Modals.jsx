import { useContext } from "react";
import Modal from "../../../../UI/modal/modal.jsx";
import { ModalContext } from "../../../../blocks/content/Main.jsx";
import Create from "../../create-org/Create-org.jsx";
import Read from "../../read-org/Read-org.jsx";
import Update from "../../update-org/Patch-org.jsx";
import Delete from "../../delete-org/Delete-org.jsx";
import { useTypedSelector } from "../../../../redux/hooks/hooks";
import { useLocation } from "react-router";
import * as OrgAPI from "../../../../redux/actions/OrgsAction";
import * as CounterpartyAPI from "../../../../redux/actions/CounterpartiesAction";

export default function CRUDModals() {
    const { pathname } = useLocation();
    const MODALS = useContext(ModalContext);
    const UserId = useTypedSelector((state) => state.userReducer.data.id);
    const COUNTERPARTY = useTypedSelector(
        (state) => state.counterpartyReducer.counterparty
    );
    const USERORG = useTypedSelector((state) => state.orgsReducer.org);

    const OrgId = USERORG ? USERORG.id : null;
    // если находимся в личном кабинете - работаем с организацией пользователя, иначе - с контрагентами организации
    const isUserOrg = pathname === "/private";

    return (
        <>
            {MODALS.modalAdd.show && (
                <Modal
                    size={{ height: "75vh", width: "75vw" }}
                    active={MODALS.modalAdd.add}
                    setActive={MODALS.setModalAdd}
                >
                    {isUserOrg ? (
                        <Create
                            UserId={UserId}
                            OrgId={null}
                            action={OrgAPI.postOrganization}
                        />
                    ) : (
                        <Create
                            UserId={UserId}
                            OrgId={OrgId}
                            action={CounterpartyAPI.postCounterparty}
                        />
                    )}
                </Modal>
            )}
            {MODALS.modalRead.show && (
                <Modal
                    active={MODALS.modalRead.add}
                    setActive={MODALS.setModalRead}
                >
                    {isUserOrg ? (
                        <Read ORG={USERORG} />
                    ) : (
                        <Read ORG={COUNTERPARTY} />
                    )}
                </Modal>
            )}
            {MODALS.modalUpdate.show && (
                <Modal
                    active={MODALS.modalUpdate.add}
                    setActive={MODALS.setModalUpdate}
                >
                    {isUserOrg ? (
                        <Update
                            ORG={USERORG}
                            action={OrgAPI.patchOrganization}
                        />
                    ) : (
                        <Update
                            ORG={COUNTERPARTY}
                            action={CounterpartyAPI.patchCounterparty}
                        />
                    )}
                </Modal>
            )}
            {MODALS.modalDelete.show && (
                <Modal
                    size={{ height: "25vh", width: "40vw" }}
                    active={MODALS.modalDelete.add}
                    setActive={MODALS.setModalDelete}
                >
                    {isUserOrg ? (
                        <Delete
                            id={USERORG?.id}
                            orgname={USERORG?.orgname}
                            action={OrgAPI.deleteOrganization}
                        />
                    ) : (
                        <Delete
                            id={COUNTERPARTY?.id}
                            orgname={COUNTERPARTY?.orgname}
                            action={CounterpartyAPI.deleteCounterparty}
                        />
                    )}
                </Modal>
            )}
        </>
    );
}
