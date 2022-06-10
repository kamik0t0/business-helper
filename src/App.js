import React from "react";
import classes from "./styles/app.module.css";
import Content from "../src/UI/Curtain/Content/Content.jsx";
import Header from "../src/blocks/header/Header.jsx";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Error from "./UI/Error/Error.jsx";

export default function App() {
    const ERROR = useSelector((state) => state.errorReducer);
    return (
        <>
            <div className={classes.app}>
                <div id="conteiner" className={classes.conteiner}>
                    <BrowserRouter>
                        <Header />
                        <Content />
                    </BrowserRouter>
                    {ERROR.isError && <Error message={ERROR.message} />}
                </div>
            </div>
        </>
    );
}

// "https://deploy-test-business-assist.herokuapp.com",
