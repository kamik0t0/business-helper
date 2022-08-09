import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useGoBack } from "../../components/waybills-service/common/hooks/useGoBack";
import PositionHeaders from "../../components/waybills-service/common/position-header/Position-headers";
import { usePositions } from "../../components/waybills-service/common/position/hooks/usePositions";
import Positons from "../../components/waybills-service/common/Positons";
import { InvoiceSummary } from "../../components/waybills-service/common/total/InvoiceSummary";
import { useTypedSelector } from "../../redux/hooks/hooks";
import Button from "../../UI/input/Button/Button";
import TextField from "../../UI/input/TextField/TextField";
import Link from "../../UI/Link/Link";
import Loader from "../../UI/Loader/Loader";
import classes from "../styles/update-invoice.module.css";
import { useCreateInvoice } from "./hooks/useCreateInvoice";
import {
    inputCounterpartyStyle,
    inputDateStyle,
    linkStyle,
} from "./utils/stylesObjects";

export default function InvoiceComponent({ Info, action }) {
    const { orgId } = useParams();
    const { isLoading } = useTypedSelector((state) => state.invoicesReducer);
    const { Invoice, InvoicePosition } = useTypedSelector(
        (state) => state.invoicesReducer
    );
    const InvoiceAPI = useCreateInvoice(action);
    const goBack = useGoBack();
    const [addPosition, deletePosition] = usePositions();

    return (
        <>
            <div className={classes.waybill_form_header}>
                <div className={classes.waybill_form_header_save}>
                    <Button onClick={InvoiceAPI.create}>Сохранить</Button>
                    <Button>Excel</Button>
                    <div className={classes.waybill_form_header_save_name}>
                        {Info[0]}
                    </div>
                    <Button onClick={goBack}>Закрыть</Button>
                </div>
                <div className={classes.waybill_form_header_date}>
                    <TextField
                        id="waybillDate"
                        type="date"
                        style={inputDateStyle}
                        defaultValue={
                            Invoice?.waybill_date.slice(0, -14) || null
                        }
                        onChange={InvoiceAPI.setDate}
                    />
                    <TextField
                        style={inputCounterpartyStyle}
                        type="text"
                        defaultValue={InvoiceAPI.counterpartyName}
                    />
                    <Link path={`/counterparties/${orgId}`} style={linkStyle}>
                        <Button>Выбрать...</Button>
                    </Link>
                </div>
                <div className={classes.waybill_form_header_usage}>
                    <Button onClick={addPosition}>Добавить</Button>
                    <Button onClick={deletePosition}>Удалить</Button>
                </div>
            </div>
            <PositionHeaders />
            {isLoading ? <Loader /> : <Positons positions={InvoicePosition} />}
            <InvoiceSummary
                summ={Invoice?.summ}
                nds={Invoice?.nds}
                total={Invoice?.total}
            />
        </>
    );
}

InvoiceComponent.propTypes = {
    CounterpartyInfo: PropTypes.array.isRequired,
    action: PropTypes.func.isRequired,
};
