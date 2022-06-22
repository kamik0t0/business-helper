import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import classes from "../styles/update-waybill.module.css";
import Loader from "../../../UI/Loader/Loader.jsx";
import PositionHeaders from "../common/Position-headers.jsx";
import { Total, TotalWrapper } from "../create-waybill/total/Total.jsx";
import MyInput from "../../../UI/input/MyInput/MyInput.jsx";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import PropTypes from "prop-types";
import { setWaybillAction } from "../../../redux/waybill-reducer.js";
import { useUpdatePositions } from "./hooks/useUpdatePositions";
import { useUpdateWaybill } from "./hooks/useUpdateWaybill";
import Positons from "../common/Positons.jsx";

export default function UpdateWaybill({ CounterpartyInfo }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goBack = (event) => {
        event.preventDefault();
        navigate(-1);
        dispatch(setWaybillAction({}));
    };

    const WAYBILL = useSelector((state) => state.setWaybill.waybill);

    const [
        loader,
        positions,
        addPosition,
        deletePosition,
        highlightPosition,
        getPositionValues,
        fillStartPositions,
        getPositions,
    ] = useUpdatePositions();

    const [
        UpdateWaybill,
        defaultDate,
        update,
        setTotal,
        getDate,
        getCounterparty,
    ] = useUpdateWaybill(positions, WAYBILL);

    const dispatchUpdateWaybill = (event) => dispatch(update(event));

    useEffect(() => {
        async function fill() {
            const Positions = await getPositions(WAYBILL.id);
            fillStartPositions(Positions);
        }
        fill();
    }, []);

    return (
        <>
            <form className={classes.content}>
                <div className={classes.waybill_form_header}>
                    <div className={classes.waybill_form_header_save}>
                        <MyButton onClick={dispatchUpdateWaybill}>
                            Сохранить
                        </MyButton>
                        <MyButton>Excel</MyButton>
                        <div className={classes.waybill_form_header_save_name}>
                            {CounterpartyInfo[0]}
                        </div>

                        <MyButton onClick={goBack}>Закрыть</MyButton>
                    </div>
                    <div className={classes.waybill_form_header_date}>
                        <MyInput
                            id="waybillDate"
                            name="Дата:"
                            type="date"
                            defaultValue={defaultDate}
                            getValue={getDate}
                        />
                        <MyInput
                            style={{ width: "350px" }}
                            name={CounterpartyInfo[1] + ":"}
                            type="text"
                            defaultValue={
                                UpdateWaybill.current.counterparty.orgname ||
                                WAYBILL.cl_orgname
                            }
                            getValue={getCounterparty}
                        />
                        <Link to={`/counterparties`}>
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

UpdateWaybill.propTypes = {
    CounterpartyInfo: PropTypes.array.isRequired,
};
