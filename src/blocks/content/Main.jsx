import React from "react";
import AppRouter from "../../routers/AppRouter.jsx";
import ErrorBoundary from "../../utils/errorBoundary.jsx";
import { useModals } from "./hooks/useModals";
import classes from "./styles/main.module.css";

export const ModalContext = React.createContext();

export default function Main() {
    const MODALS = useModals();

    return (
        <main id="main" className={classes.main}>
            <ErrorBoundary>
                <ModalContext.Provider value={MODALS}>
                    <AppRouter />
                </ModalContext.Provider>
            </ErrorBoundary>
        </main>
    );
}
