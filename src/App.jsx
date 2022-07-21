import classes from "./styles/app.module.css";
import Content from "./UI/Curtain/Content/Content.jsx";
import Header from "./blocks/header/Header.jsx";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";

export default function App() {
    const [curtain, setCurtain] = useState(true);

    function showCurtain() {
        setCurtain((curtain) => !curtain);
    }
    return (
        <>
            <div className={classes.app}>
                <div id="conteiner" className={classes.conteiner}>
                    <BrowserRouter>
                        <Header />
                        <Content showCurtain={showCurtain} curtain={curtain} />
                    </BrowserRouter>
                </div>
            </div>
        </>
    );
}
