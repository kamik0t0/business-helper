import { Dispatch, SetStateAction } from "react";
import { IModalsState } from "../../../../blocks/content/hooks/useModals";

export function modalManager(setModal: Dispatch<SetStateAction<IModalsState>>) {
    function showModal() {
        setModal(
            (prev: IModalsState): IModalsState => ({ ...prev, show: true })
        );
        setTimeout(() => {
            setModal(
                (prev: IModalsState): IModalsState => ({ ...prev, add: true })
            );
        }, 0);
    }
    function hideModal() {
        setModal(
            (prev: IModalsState): IModalsState => ({ ...prev, add: false })
        );
        setTimeout(() => {
            setModal(
                (prev: IModalsState): IModalsState => ({ ...prev, show: false })
            );
        }, 500);
    }
    return [showModal, hideModal];
}
