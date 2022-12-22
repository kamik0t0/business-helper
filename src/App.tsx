import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./blocks/header/Header";
import classes from "./styles/app.module.css";
import Content from "./UI/Curtain/Content/Content";
import PolyButton from "./testGenericComponent/PolyButton";
import { useAuth } from "./utils/checkAuth";

const App: React.FC = () => {
    const [curtain, setCurtain] = useState<boolean>(true);
    const showCurtain = (): void => setCurtain((curtain) => !curtain);
    const checkAuth = useAuth();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) checkAuth(token);
    }, []);

    return (
        <>
            <div className={classes.app}>
                <div id="conteiner" className={classes.conteiner}>
                    <BrowserRouter>
                        <Header />
                        <Content showCurtain={showCurtain} curtain={curtain} />
                        <PolyButton primary as="button" value="poly">
                            Click Me
                        </PolyButton>
                        <PolyButton secondary as="a" href="">
                            Click Me
                        </PolyButton>
                    </BrowserRouter>
                </div>
            </div>
        </>
    );
};

export default App;
