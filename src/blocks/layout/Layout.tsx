import classes from "./style/content-frame.module.css";
import { Outlet } from "react-router-dom";
import { useTypedSelector } from "../../redux/hooks/hooks";

const Layout: React.FC = () => {
    const { email } = useTypedSelector((state) => state.userReducer.data);
    return (
        <main className={classes.content}>
            <div className={classes.header}>{email}</div>
            <Outlet />
        </main>
    );
};

export default Layout;
