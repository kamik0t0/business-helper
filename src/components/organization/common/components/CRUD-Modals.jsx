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

const InlineModalStyles = { height: "25vh", width: "40vw" };
const InlineCreateModalStyles = { height: "75vh", width: "75vw" };

export default function CRUDModals() {
    const { pathname } = useLocation();
    const MODALS = useContext(ModalContext);
    const { id: UserId } = useTypedSelector((state) => state.userReducer.data);
    const { counterparty, isLoading: isOrgLoading } = useTypedSelector(
        (state) => state.counterpartyReducer
    );
    const { org, isLoading: isCounterpartyLoading } = useTypedSelector(
        (state) => state.orgsReducer
    );
    const OrgId = org?.id || null;
    // если находимся в личном кабинете - работаем с организацией пользователя, иначе - с контрагентами организации
    const isUserOrg = pathname === "/private";

    return (
        <>
            {MODALS.modalAdd.show && (
                <Modal
                    size={InlineCreateModalStyles}
                    active={MODALS.modalAdd.add}
                    setActive={MODALS.setModalAdd}
                >
                    {isUserOrg ? (
                        <Create
                            UserId={UserId}
                            OrgId={null}
                            action={OrgAPI.postOrganization}
                            isLoading={isOrgLoading}
                        />
                    ) : (
                        <Create
                            UserId={UserId}
                            OrgId={OrgId}
                            action={CounterpartyAPI.postCounterparty}
                            isLoading={isCounterpartyLoading}
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
                        <Read org={org} />
                    ) : (
                        <Read org={counterparty} />
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
                            org={org}
                            action={OrgAPI.patchOrganization}
                            isLoading={isOrgLoading}
                        />
                    ) : (
                        <Update
                            org={counterparty}
                            action={CounterpartyAPI.patchCounterparty}
                            isLoading={isCounterpartyLoading}
                        />
                    )}
                </Modal>
            )}
            {MODALS.modalDelete.show && (
                <Modal
                    size={InlineModalStyles}
                    active={MODALS.modalDelete.add}
                    setActive={MODALS.setModalDelete}
                >
                    {isUserOrg ? (
                        <Delete
                            id={org?.id}
                            orgname={org?.orgname}
                            action={OrgAPI.deleteOrganization}
                            isLoading={isOrgLoading}
                        />
                    ) : (
                        <Delete
                            id={counterparty?.id}
                            orgname={counterparty?.orgname}
                            action={CounterpartyAPI.deleteCounterparty}
                            isLoading={isCounterpartyLoading}
                        />
                    )}
                </Modal>
            )}
        </>
    );
}
