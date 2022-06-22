import classes from "./styles/patch-org.module.css";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import { useSelector } from "react-redux";
import PatchFieldsWrapper from "../../common/components/PatchFieldsWrapper.jsx";
import { useCounterparty } from "./hooks/useCounterparty";
import { usePatchCounterparty } from "./hooks/usePatchCounterparty";

export default function PatchCounterparty() {
    const COUNTERPARTY = useSelector(
        (state) => state.setCounterpartyReducer.counterparty
    );
    const counterpartyRequisites = useCounterparty(COUNTERPARTY);

    const [loader, hideModal, getInputValue, setInputValue, update] =
        usePatchCounterparty(COUNTERPARTY);

    return (
        <>
            {COUNTERPARTY === null ? (
                <div className={classes.read}>
                    <div className={classes.noorg}>Организация не выбрана</div>
                </div>
            ) : (
                <div className={classes.read}>
                    <div className={classes.header}>Реквизиты</div>
                    {loader ? (
                        <Loader />
                    ) : (
                        <PatchFieldsWrapper
                            requisites={counterpartyRequisites}
                            getInputValue={getInputValue}
                            setInputValue={setInputValue}
                        />
                    )}

                    <div className={classes.buttons}>
                        <MyButton onClick={update}>Обновить</MyButton>
                        <MyButton onClick={hideModal}>Закрыть</MyButton>
                    </div>
                </div>
            )}
        </>
    );
}
