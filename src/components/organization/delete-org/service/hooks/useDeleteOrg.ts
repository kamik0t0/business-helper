import { useContext } from "react";
import { ModalContext } from "../../../../../blocks/content/Main";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control";
import { useTypedDispatch } from "../../../../../redux/hooks/hooks";

export function useDeleteOrg(
    id: number | null | undefined,
    action: (id: number) => any
): [
    (event: React.ChangeEvent<HTMLButtonElement>) => Promise<void>,
    () => void
] {
    const dispatch = useTypedDispatch();
    const { setModalDelete } = useContext(ModalContext)!;
    const [_, hideModal] = modalManager(setModalDelete);

    const deleteOrg = async (
        event: React.ChangeEvent<HTMLButtonElement>
    ): Promise<void> => {
        event.preventDefault();

        id && (await dispatch(action(id)));
        hideModal();
    };

    return [deleteOrg, hideModal];
}
