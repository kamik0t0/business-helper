// компонент создания накладной
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import classes from "../styles/update-waybill.module.css";
import PositionHeaders from "../common/Position-headers.jsx";
import { Total, TotalWrapper } from "./total/Total.jsx";
import MyInput from "../../../UI/input/MyInput/MyInput.jsx";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import PropTypes from "prop-types";
import { useCreateWaybill } from "./hooks/useCreateWaybill";
import { useCreatePositions } from "./hooks/usePositions";
import Positons from "../common/Positons-HOC.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";

export default function CreateWaybill({ CounterpartyInfo }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    const [
        positions,
        addPosition,
        deletePosition,
        highlightPosition,
        getPositionValues,
    ] = useCreatePositions();

    const [
        loader,
        WAYBILL,
        defaultDate,
        create,
        setTotal,
        getDate,
        getCounterparty,
    ] = useCreateWaybill(positions);

    const dispatchCreateWaybill = (event) => dispatch(create(event));

    return (
        <>
            <form className={classes.content}>
                <div className={classes.waybill_form_header}>
                    <div className={classes.waybill_form_header_save}>
                        <MyButton onClick={dispatchCreateWaybill}>
                            Сохранить
                        </MyButton>
                        <MyButton>Excel</MyButton>
                        <div className={classes.waybill_form_header_save_name}>
                            {CounterpartyInfo[0]}
                        </div>
                        <MyButton onClick={goBack}>Закрыть</MyButton>
                    </div>
                    <div className={classes.waybill_form_header_date}>
                        <div className={classes.waybill_form_header_date_date}>
                            <MyInput
                                id="waybillDate"
                                name="Дата:"
                                type="date"
                                defaultValue={defaultDate}
                                getValue={getDate}
                            />
                        </div>
                        <MyInput
                            style={{ width: "350px" }}
                            name={CounterpartyInfo[1]}
                            type="text"
                            defaultValue={WAYBILL.current.counterparty.orgname}
                            getValue={getCounterparty}
                        />
                        <Link to={"/counterparties"}>
                            <MyButton>Выбрать...</MyButton>
                        </Link>
                    </div>
                    <div className={classes.waybill_form_header_usage}>
                        <MyButton onClick={addPosition}>Добавить</MyButton>
                        <MyButton onClick={deletePosition}>Удалить</MyButton>
                    </div>
                </div>

                <PositionHeaders />
                {loader ? (
                    <Loader />
                ) : (
                    <Positons
                        positions={positions}
                        highlightPosition={highlightPosition}
                        getPositionValues={getPositionValues}
                    />
                )}
                <TotalWrapper arr={positions}>
                    <Total
                        array={positions}
                        field="summ"
                        name="Сумма:"
                        total={setTotal}
                    />
                    <Total
                        array={positions}
                        field="NDS"
                        name="НДС:"
                        total={setTotal}
                    />
                    <Total
                        array={positions}
                        field="total"
                        name="Итого:"
                        total={setTotal}
                    />
                </TotalWrapper>
            </form>
        </>
    );
}

CreateWaybill.propTypes = {
    CounterpartyInfo: PropTypes.array.isRequired,
};
