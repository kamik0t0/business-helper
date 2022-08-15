import CRUDModals from "../../components/organization/common/components/CRUD-Modals";
import { useTypedSelector } from "../../redux/hooks/hooks";
import Link from "../../UI/Link/Link";
import Buttons from "./service/buttons/buttons";
import CounterpartiesList from "./service/counterparties-list/counterparties-list";
import CounterpartyHeader from "./service/counterparties-list/counterparty-header";
import classes from "./styles/counterparties.module.css";

const Counterparties: React.FC = () => {
    const { org } = useTypedSelector((state) => state.orgsReducer);
    return (
        <>
            <CounterpartyHeader />
            {org ? (
                <>
                    <CounterpartiesList />
                    <Buttons />
                </>
            ) : (
                <div className={classes.nocounterparties}>
                    Выберите организацию в
                    <Link path="/private"> личном кабинете</Link>
                </div>
            )}

            <CRUDModals />
        </>
    );
};

export default Counterparties;
