import PropTypes from "prop-types";
import { useCallback, useMemo, useState } from "react";
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
import { useCreateInvoice } from "./hooks/useCreateInvoice";

export default function CreateInvoice({ Info, createAction }) {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();
    const { orgId } = useParams();

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
    const { counterparty } = useTypedSelector(
        (state) => state.counterpartyReducer
    );

    const [positions, setPositions] = useState([]);

    const [addPosition, deletePosition] = usePositions(positions, setPositions);

    const CreateAPI = useCreateInvoice(positions, counterparty, createAction);

    return (
        <>
            <div className={classes.waybill_form_header}>
                <div className={classes.waybill_form_header_save}>
                    <MyButton onClick={CreateAPI.create}>Сохранить</MyButton>
                    <MyButton>Excel</MyButton>
                    <div className={classes.waybill_form_header_save_name}>
                        {Info[0]}
                    </div>
                    <MyButton onClick={goBack}>Закрыть</MyButton>
                </div>
                <div className={classes.waybill_form_header_date}>
                    <div className={classes.waybill_form_header_date_date}>
                        <MyInput
                            id="waybillDate"
                            name="Дата:"
                            type="date"
                            defaultValue={CreateAPI.defaultDate}
                            getValue={CreateAPI.setDate}
                        />
                    </div>
                    <MyInput
                        style={inputCounterpartyStyle}
                        name={Info[1]}
                        type="text"
                        defaultValue={
                            CreateAPI.CreateInvoice.current.counterparty
                                ?.orgname
                        }
                        getValue={CreateAPI.setCounterparty}
                    />
                    <MyLink path={`/counterparties/${orgId}`} style={linkStyle}>
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
                <Positons positions={positions} setPositions={setPositions} />
            )}
            <InvoiceSummary
                summ={CreateAPI.summ}
                NDS={CreateAPI.NDS}
                total={CreateAPI.total}
            />
        </>
    );
}

CreateInvoice.propTypes = {
    CounterpartyInfo: PropTypes.array.isRequired,
};
