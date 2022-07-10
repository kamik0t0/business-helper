import classes from "./styles/counterparties.module.css";
import { useTypedSelector } from "../../redux/hooks/hooks";
import CounterpartiesModals from "./service/modals/counterparties-modals.jsx";
import CounterpartiesList from "./service/counterparties-list/counterparties-list";
import Buttons from "./service/buttons/buttons.jsx";
import MyLink from "../../UI/link/MyLink.jsx";

export default function Counterparties() {
    const USERORG = useTypedSelector((state) => state.orgsReducer.org);

    return (
        <>
            <div className={classes.content}>
                <div className={classes.header}>
                    <div className={classes.header_items}>
                        {localStorage.getItem("email")}
                    </div>
                </div>
                {USERORG ? (
                    <>
                        <CounterpartiesList />
                        <Buttons />
                    </>
                ) : (
                    <div className={classes.nocounterparties}>
                        Выберите организацию в
                        <MyLink path="/private"> личном кабинете</MyLink>
                    </div>
                )}
            </div>

            <CounterpartiesModals />
        </>
    );
}
