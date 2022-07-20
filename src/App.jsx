import classes from "./styles/app.module.css";
import Content from "./UI/Curtain/Content/Content.jsx";
import Header from "./blocks/header/Header.jsx";
import { BrowserRouter } from "react-router-dom";

export default function App() {
    return (
        <>
            <div className={classes.app}>
                <div id="conteiner" className={classes.conteiner}>
                    <BrowserRouter>
                        <Header />
                        <Content />
                    </BrowserRouter>
                </div>
            </div>
        </>
    );
}
