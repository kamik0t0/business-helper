import { Dispatch, SetStateAction, useState } from "react";

export interface IModalsState {
    show: boolean;
    add: boolean;
}

export interface IModals {
    modalAdd: IModalsState;
    modalRead: IModalsState;
    modalUpdate: IModalsState;
    modalDelete: IModalsState;
    setModalAdd: Dispatch<SetStateAction<IModalsState>>;
    setModalRead: Dispatch<SetStateAction<IModalsState>>;
    setModalUpdate: Dispatch<SetStateAction<IModalsState>>;
    setModalDelete: Dispatch<SetStateAction<IModalsState>>;
}

export const useModals = (): IModals => {
    const [modalAdd, setModalAdd] = useState<IModalsState>({
        show: false,
        add: false,
    });
    const [modalRead, setModalRead] = useState<IModalsState>({
        show: false,
        add: false,
    });
    const [modalUpdate, setModalUpdate] = useState<IModalsState>({
        show: false,
        add: false,
    });
    const [modalDelete, setModalDelete] = useState<IModalsState>({
        show: false,
        add: false,
    });

    return {
        modalAdd,
        modalRead,
        modalUpdate,
        modalDelete,
        setModalAdd,
        setModalRead,
        setModalUpdate,
        setModalDelete,
    };
};
