import React, { useEffect } from "react";
import classes from "./styles/app.module.css";
import Content from "../src/UI/Curtain/Content/Content.jsx";
import Header from "../src/blocks/header/Header.jsx";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAuth } from "../src/utils/authFetching.js";
import Error from "./UI/Error/Error.jsx";

export default function App() {
    const isError = useSelector((state) => state.errorReducer.isError);
    const message = useSelector((state) => state.errorReducer.message);
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            isAuth(
                "http://localhost:5600/",
                localStorage.getItem("token"),
                () => dispatch({ type: "REG_TRUE", payload: true }),
                () => dispatch({ type: "REG_FALSE", payload: false })
            );
        } catch (error) {
            console.log(error.message);
        }
    });

    return (
        <>
            <div className={classes.app}>
                <div id="conteiner" className={classes.conteiner}>
                    <BrowserRouter>
                        <Header />
                        <Content />
                    </BrowserRouter>
                    {isError && <Error message={message} />}
                </div>
            </div>
        </>
    );
}

// "https://deploy-test-business-assist.herokuapp.com",
