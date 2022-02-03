import React, { useEffect } from "react";
import classes from "./app.module.css";
import Content from "./compontents/Content.jsx";
import Footer from "./compontents/Footer.jsx";
import Header from "./compontents/Header.jsx";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authFetching } from "../src/utils/authFetching.js";
import Error from "./UI/Error/Error.jsx";

export default function App() {
    const isError = useSelector((state) => state.errorReducer.isError);
    const dispatch = useDispatch();

    useEffect(() => {
        authFetching(
            // "http://localhost:5600/",
            "https://deploy-test-business-assist.herokuapp.com",
            dispatch,
            localStorage.getItem("token")
        );

        const interval = setInterval(async () => {
            await authFetching(
                // "http://localhost:5600/",
                "https://deploy-test-business-assist.herokuapp.com",
                dispatch,
                localStorage.getItem("token")
            );
        }, 300000);
        return () => clearInterval(interval);
    });

    return (
        <>
            <div className="App">
                <div id="conteiner" className={classes.conteiner}>
                    <BrowserRouter>
                        <Header />
                        <Content />
                        {isError ? <Error /> : <Footer />}
                    </BrowserRouter>
                </div>
            </div>
        </>
    );
}
