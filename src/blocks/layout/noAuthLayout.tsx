import classes from "./style/content-frame.module.css";
import { Outlet } from "react-router-dom";

const UnAuthLayout: React.FC = () => {
    return (
        <main className={classes.content}>
            <div className={classes.header}>Не авторизован</div>
            <Outlet />
        </main>
    );
};

export default UnAuthLayout;
