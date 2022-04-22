// компонент создания накладной
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import classes from "../styles/update-waybill.module.css";
import Position from "./position/Position.jsx";
import PositionHeaders from "../common/Position-headers.jsx";
import { Positions } from "../../../utils/wbpositionClass.js";
import { Total, TotalWrapper } from "./total/Total.jsx";
import MyInput from "../../../UI/input/MyInput/MyInput.jsx";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import { create } from "./service/create.js";
import { highlight } from "../../../utils/highlight.js";
import {
    getNomenclature,
    getQuantity,
    getPrice,
    total,
    makeDefaultDate,
    makeDate,
} from "./service/handlers.js";
import PropTypes from "prop-types";

export default function CreateWaybill({ CounterpartyInfo, path }) {
    const dispatch = useDispatch();
    const MYORG = useSelector((state) => state.setMyOrgReducer.myOrg);
    const COUNTERPARTY = useSelector(
        (state) => state.setCounterpartyReducer.counterparty
    );
    const DATA = path === "/sales" ? "SALES" : "PURCHASES";
    // объект накладная для отправки на сервер
    const WAYBILL = useRef({ date: makeDefaultDate() });
    WAYBILL.current["myOrg"] = MYORG;
    WAYBILL.current["counterparty"] = COUNTERPARTY;
    // массив позиций в накладной
    const [positions, setPositions] = useState([]);
    // номер позиции
    const [counter, setCounter] = useState(0);
    // редирект к списку если накладная создана
    const [navToList, setNavToList] = useState(false);
    // useRef - запоминаем значение при ререндеринге
    let row = useRef(null);

    const addRow = (event) => {
        event.preventDefault();
        positions.push(new Positions(counter));
        setPositions();
        setCounter((prev) => prev + 1);
        setPositions([...positions]);
    };

    const deleteRow = (event) => {
        event.preventDefault();
        if (row.current != null) {
            positions.splice(row.current - 1, 1);
            setPositions();
            row.current = null;
        }
    };

    return (
        <>
            {navToList ? (
                <Navigate to={path} />
            ) : (
                <form className={classes.content}>
                    <div className={classes.waybill_form_header}>
                        <div className={classes.waybill_form_header_save}>
                            <MyButton
                                onClick={async (event) => {
                                    const result = await create(
                                        event,
                                        path,
                                        WAYBILL,
                                        positions,
                                        () => setNavToList(true),
                                        () =>
                                            dispatch({
                                                type: "REG_FALSE",
                                                payload: false,
                                            })
                                    );
                                    dispatch({
                                        type: DATA,
                                        payload: result,
                                    });
                                }}
                            >
                                Сохранить
                            </MyButton>
                            <MyButton>Excel</MyButton>
                            <div
                                className={
                                    classes.waybill_form_header_save_name
                                }
                            >
                                {CounterpartyInfo[0]}
                            </div>
                            <Link to={path}>
                                <MyButton>Закрыть</MyButton>
                            </Link>
                        </div>
                        <div className={classes.waybill_form_header_date}>
                            <div
                                className={
                                    classes.waybill_form_header_date_date
                                }
                            >
                                <MyInput
                                    id="waybillDate"
                                    name="Дата:"
                                    type="date"
                                    defaultValue={
                                        WAYBILL.current.date === undefined
                                            ? null
                                            : WAYBILL.current.date.slice(0, -14)
                                    }
                                    getValue={(event) => {
                                        WAYBILL.current.date =
                                            `${
                                                event.target.value
                                            }${makeDate()}` ||
                                            WAYBILL.current.date;
                                    }}
                                />
                            </div>
                            {path === "/purchases" && (
                                <MyInput
                                    name={CounterpartyInfo[2] + ": "}
                                    type="text"
                                    getValue={(event) => {
                                        WAYBILL.current["cl_waybill_number"] =
                                            event.target.value;
                                    }}
                                    style={{ width: "145px" }}
                                />
                            )}
                            <MyInput
                                style={{ width: "350px" }}
                                name={CounterpartyInfo[1]}
                                type="text"
                                defaultValue={COUNTERPARTY.orgname}
                                getValue={(event) =>
                                    (WAYBILL.current.counterparty =
                                        event.target.value)
                                }
                            />
                            <Link
                                to={`/counterparties:${path.slice(
                                    1
                                )}:createwaybill`}
                            >
                                <MyButton>Выбрать...</MyButton>
                            </Link>
                        </div>
                        <div className={classes.waybill_form_header_usage}>
                            <MyButton onClick={addRow}>Добавить</MyButton>
                            <MyButton onClick={deleteRow}>Удалить</MyButton>
                        </div>
                    </div>

                    <PositionHeaders />
                    {positions.map((item, index) => {
                        return (
                            <Position
                                highlight={item.highlight}
                                getRow={(event, number) =>
                                    highlight(
                                        number,
                                        positions,
                                        () => setPositions([...positions]),
                                        row
                                    )
                                }
                                key={item.number}
                                classes={classes}
                                number={index}
                                getSumm={item.getSumm.bind(item)}
                                getNDS={item.getNDS.bind(item)}
                                getTotal={item.getTotal.bind(item)}
                                getNomenclature={(event, number) =>
                                    getNomenclature(event, number, positions)
                                }
                                getQuantity={(event, number) =>
                                    getQuantity(event, number, positions, () =>
                                        setPositions([...positions])
                                    )
                                }
                                getPrice={(event, number) =>
                                    getPrice(event, number, positions, () =>
                                        setPositions([...positions])
                                    )
                                }
                            />
                        );
                    })}
                    <TotalWrapper arr={positions}>
                        <Total
                            array={positions}
                            field="summ"
                            name="Сумма:"
                            total={(array, field) =>
                                total(array, field, WAYBILL)
                            }
                        />
                        <Total
                            array={positions}
                            field="NDS"
                            name="НДС:"
                            total={(array, field) =>
                                total(array, field, WAYBILL)
                            }
                        />
                        <Total
                            array={positions}
                            field="total"
                            name="Итого:"
                            total={(array, field) =>
                                total(array, field, WAYBILL)
                            }
                        />
                    </TotalWrapper>
                </form>
            )}
        </>
    );
}

CreateWaybill.propTypes = {
    CounterpartyInfo: PropTypes.array.isRequired,
    path: PropTypes.string.isRequired,
};
