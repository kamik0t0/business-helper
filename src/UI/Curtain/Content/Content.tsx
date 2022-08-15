import classes from "./styles/content.module.css";
import SideMenu from "../../../blocks/side/Side-menu";
import Main from "../../../blocks/content/Main";
import Curtain from "../Curtain";
import { useTypedSelector } from "../../../redux/hooks/hooks";

interface IContent {
    showCurtain(): void;
    curtain: boolean;
}

const Content: React.FC<IContent> = ({ showCurtain, curtain }) => {
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
};

export default Content;
