import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./blocks/header/Header";
import classes from "./styles/app.module.css";
import Content from "./UI/Curtain/Content/Content";

const App: React.FC = () => {
    const [curtain, setCurtain] = useState<boolean>(true);
    const showCurtain = (): void => setCurtain((curtain) => !curtain);

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
};

export default App;
