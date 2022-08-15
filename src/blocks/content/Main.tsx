import React from "react";
import AppRouter from "../../routers/AppRouter";
import ErrorBoundary from "../../utils/errorBoundary";
import { IModals, useModals } from "./hooks/useModals";
import classes from "./styles/main.module.css";

export const ModalContext = React.createContext<IModals | null>(null);

const Main: React.FC = () => {
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
};

export default Main;
