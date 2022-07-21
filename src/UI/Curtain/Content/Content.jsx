import classes from "./styles/content.module.css";
import SideMenu from "../../../blocks/side/Side-menu.jsx";
import Main from "../../../blocks/content/Main.jsx";
import Curtain from "../../../UI/Curtain/Curtain.jsx";
import { useTypedSelector } from "../../../redux/hooks/hooks";

export default function Content({ showCurtain, curtain }) {
    const { org } = useTypedSelector((state) => state.orgsReducer);
    return (
        <div id="content" className={classes.content}>
            <Curtain showCurtain={showCurtain} curtain={curtain} />
            <SideMenu
                showCurtain={showCurtain}
                curtain={curtain}
                id={org?.id}
            />
            <Main />
        </div>
    );
}
