import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PositionHeaders from "../../components/waybills-service/common/position-header/Position-headers";
import { usePositions } from "../../components/waybills-service/common/position/hooks/usePositions";
import Positons from "../../components/waybills-service/common/Positons";
import { InvoiceSummary } from "../../components/waybills-service/common/total/InvoiceSummary";
import { useTypedDispatch, useTypedSelector } from "../../redux/hooks/hooks";
import { setInvoice } from "../../redux/reducers/InvoiceSlice";
import MyButton from "../../UI/input/MyButton/MyButton";
import MyInput from "../../UI/input/MyInput/MyInput";
import MyLink from "../../UI/link/MyLink";
import Loader from "../../UI/Loader/Loader";
import classes from "../styles/update-invoice.module.css";
import { useRequestInvoicePositions } from "./hooks/useRequestInvoicePositions";
import { useUpdateInvoice } from "./hooks/useUpdateInvoice";

export default function UpdateInvoice({
    Info,
    requestInvoiceItemsAction,
    updateAction,
}) {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();
    const { orgId } = useParams();

    // можно было вынести за компонент и не использовать useMemo;
    const inputCounterpartyStyle = useMemo(
        () => ({
            width: "350px",
        }),
        []
    );
    const linkStyle = useMemo(() => ({ fontSize: "1.0em" }), []);

    const goBack = useCallback(
        (event) => {
            event.preventDefault();
            navigate(-1);
            dispatch(setInvoice(null));
        },
        [dispatch, navigate]
    );

    const { isLoading } = useTypedSelector((state) => state.invoicesReducer);
    const { Invoice } = useTypedSelector((state) => state.invoicesReducer);
    const { counterparty } = useTypedSelector(
        (state) => state.counterpartyReducer
    );

    const [positions, setPositions] = useState([]);

    const { requestPositions, serializeInvoiceItems } =
        useRequestInvoicePositions(requestInvoiceItemsAction, setPositions);

    const { addPosition, deletePosition } = usePositions(
        positions,
        setPositions
    );

    const UpdateAPI = useUpdateInvoice(
        positions,
        counterparty,
        Invoice,
        updateAction
    );

    useEffect(() => {
        // следует отправить запрошенные позиции накладной в redux, т.к. если перейти на страницу выбора контрагента, то произойдет повторный запрос и изменения не сохранятся
        requestPositions(Invoice.id).then(({ payload: invoiceItems }) =>
            serializeInvoiceItems(invoiceItems)
        );
    }, [Invoice.id]);

    return (
        <>
            <form className={classes.content}>
                <div className={classes.waybill_form_header}>
                    <div className={classes.waybill_form_header_save}>
                        <MyButton onClick={UpdateAPI.update}>
                            Сохранить
                        </MyButton>
                        <MyButton>Excel</MyButton>
                        <div className={classes.waybill_form_header_save_name}>
                            {Info[0]}
                        </div>

                        <MyButton onClick={goBack}>Закрыть</MyButton>
                    </div>
                    <div className={classes.waybill_form_header_date}>
                        <MyInput
                            id="waybillDate"
                            name="Дата:"
                            type="date"
                            defaultValue={UpdateAPI.defaultDate}
                            getValue={UpdateAPI.setDate}
                        />
                        <MyInput
                            style={inputCounterpartyStyle}
                            name={Info[1] + ":"}
                            type="text"
                            defaultValue={
                                counterparty?.orgname ||
                                UpdateAPI.UpdateInvoice.current.counterparty
                                    ?.orgname
                            }
                            getValue={UpdateAPI.setCounterpartyName}
                        />
                        <MyLink
                            path={`/counterparties/${orgId}`}
                            style={linkStyle}
                        >
                            <MyButton>Выбрать...</MyButton>
                        </MyLink>
                    </div>
                    <div className={classes.waybill_form_header_usage}>
                        <MyButton onClick={addPosition}>Добавить</MyButton>
                        <MyButton onClick={deletePosition}>Удалить</MyButton>
                    </div>
                </div>
                <PositionHeaders />
                {isLoading ? (
                    <Loader />
                ) : (
                    <Positons
                        positions={positions}
                        setPositions={setPositions}
                    />
                )}
                <InvoiceSummary
                    summ={UpdateAPI.summ}
                    NDS={UpdateAPI.NDS}
                    total={UpdateAPI.total}
                />
            </form>
        </>
    );
}

UpdateInvoice.propTypes = {
    Info: PropTypes.array.isRequired,
};
