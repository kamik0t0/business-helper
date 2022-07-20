import classes from "./styles/counterparties.module.css";
import { useTypedSelector } from "../../redux/hooks/hooks";
import CRUDModals from "../../components/organization/common/components/CRUD-Modals";
import CounterpartiesList from "./service/counterparties-list/counterparties-list";
import Buttons from "./service/buttons/buttons.jsx";
import MyLink from "../../UI/link/MyLink.jsx";
import CounterpartyHeader from "./service/counterparties-list/counterparty-header";

export default function Counterparties() {
    const { org } = useTypedSelector((state) => state.orgsReducer);
    const { email } = useTypedSelector((state) => state.userReducer.data);

    return (
        <>
            <div className={classes.content}>
                <CounterpartyHeader />
                <div className={classes.header_items}>{email}</div>
                {org ? (
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

            <CRUDModals />
        </>
    );
}
