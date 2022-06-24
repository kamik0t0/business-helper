import React, { useEffect } from "react";
import classes from "./styles/app.module.css";
import Content from "../src/UI/Curtain/Content/Content.jsx";
import Header from "../src/blocks/header/Header.jsx";
import { BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authFetching } from "./utils/authFetching";
import { useParams } from "react-router-dom";
import Error from "./UI/Error/Error.jsx";

export default function App() {
    const ERROR = useSelector((state) => state.errorReducer);
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.authReducer.isAuth);

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
