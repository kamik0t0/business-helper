import React, { useState } from "react";
import AppRouter from "../../routers/AppRouter.jsx";
import classes from "./styles/main.module.css";
import ErrorBoundary from "../../utils/errorBoundary.jsx";

export const ModalContext = React.createContext();

export default function Main() {
    const [modalAdd, setModalAdd] = useState({ show: false, add: false });
    const [modalRead, setModalRead] = useState({ show: false, add: false });
    const [modalUpdate, setModalUpdate] = useState({ show: false, add: false });
    const [modalDelete, setModalDelete] = useState({ show: false, add: false });

    const context = {
        modalAdd,
        modalRead,
        modalUpdate,
        modalDelete,
        setModalAdd,
        setModalRead,
        setModalUpdate,
        setModalDelete,
    };
    return (
        <div id="main" className={classes.main}>
            {/* В этот компонент открываются страницы */}
            <ErrorBoundary>
                <ModalContext.Provider value={context}>
                    <AppRouter classes={classes} />
                </ModalContext.Provider>
            </ErrorBoundary>
        </div>
    );
}
