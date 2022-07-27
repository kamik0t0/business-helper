import { useState } from "react";

export const useModals = () => {
    const [modalAdd, setModalAdd] = useState({ show: false, add: false });
    const [modalRead, setModalRead] = useState({ show: false, add: false });
    const [modalUpdate, setModalUpdate] = useState({ show: false, add: false });
    const [modalDelete, setModalDelete] = useState({ show: false, add: false });

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
