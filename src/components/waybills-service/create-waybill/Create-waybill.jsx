// компонент создания накладной
import React, { useState, useRef, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import classes from "./styles/create-waybill.module.css";
import Position from "./position/Position.jsx";
import { Positions } from "../../../utils/wbpositionClass.js";
import { Total, TotalWrapper } from "./total/Total.jsx";
import MyInput from "../../../UI/input/MyInput/MyInput.jsx";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import { create } from "./service/create.js";
import { v4 as uuid } from "uuid";
import {
    addRow,
    getNomenclature,
    getQuantity,
    getPrice,
    getRow,
    deleteRow,
    total,
    makeDefaultDate,
    makeDate,
} from "./service/handlers.js";

export default function CreateWaybill({ wbType, path }) {
    const [positions, setPositions] = useState([]);
    const [counter, setCounter] = useState(0);
    const [created, setCreated] = useState(false);
    // useRef - запоминаем значение при ререндеринге
    let row = useRef(null);
    // объект накладная для отправки на сервер
    const WB = useRef({});

    useEffect(() => {
        WB.current["date"] = makeDefaultDate();
    });

    return (
        <>
            {created ? (
                <Navigate to={path} />
            ) : (
                <form className={classes.content}>
                    <div className={classes.waybill_form_header}>
                        <div className={classes.waybill_form_header_save}>
                            {" "}
                            <MyButton
                                onClick={(event) =>
                                    create(
                                        event,
                                        `http://localhost:5600${path}/?OrgId=${localStorage.getItem(
                                            "OrgsId"
                                        )}`,
                                        path.slice(1),
                                        WB,
                                        positions,
                                        // setWaybills,
                                        setCreated
                                    )
                                }
                            >
                                Сохранить
                            </MyButton>
                            <MyButton>Excel</MyButton>
                            <div
                                className={
                                    classes.waybill_form_header_save_name
                                }
                            >
                                {wbType[0]}
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
                                        WB.current.date === undefined
                                            ? null
                                            : WB.current.date.slice(0, -14)
                                    }
                                    getValue={(event) => {
                                        WB.current.date =
                                            `${
                                                event.target.value
                                            }${makeDate()}` || WB.current.date;
                                    }}
                                />
                            </div>
                            <MyInput
                                style={{ width: "350px" }}
                                name={wbType[1]}
                                type="text"
                                defaultValue={
                                    JSON.parse(
                                        localStorage.getItem("counterparty")
                                    ) !== null || undefined
                                        ? JSON.parse(
                                              localStorage.getItem(
                                                  "counterparty"
                                              )
                                          ).orgname
                                        : ""
                                }
                                getValue={(event) =>
                                    (WB.current.counterparty =
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
                            <MyButton
                                onClick={(event) =>
                                    addRow(
                                        event,
                                        positions,
                                        Positions,
                                        counter,
                                        setCounter,
                                        setPositions
                                    )
                                }
                            >
                                Добавить
                            </MyButton>
                            <MyButton
                                onClick={(event) =>
                                    deleteRow(
                                        event,
                                        positions,
                                        setPositions,
                                        row
                                    )
                                }
                            >
                                Удалить
                            </MyButton>
                        </div>
                    </div>

                    <div className={classes.waybill_form_wb_header}>
                        <div className={classes.waybill_form_wb_header_number}>
                            №
                        </div>
                        <div
                            className={
                                classes.waybill_form_wb_header_nomenclature
                            }
                        >
                            Номенклатура
                        </div>
                        <div
                            className={classes.waybill_form_wb_header_quantity}
                        >
                            Кол.
                        </div>
                        <div className={classes.waybill_form_wb_header_price}>
                            Цена
                        </div>
                        <div className={classes.waybill_form_wb_header_summ}>
                            Сумма
                        </div>
                        <div
                            className={classes.waybill_form_wb_header_NDSprcnt}
                        >
                            %
                        </div>
                        <div className={classes.waybill_form_wb_header_NDS}>
                            НДС
                        </div>
                        <div className={classes.waybill_form_wb_header_total}>
                            Всего
                        </div>
                    </div>
                    {positions.map((item, index) => {
                        return (
                            <Position
                                highlight={item.highlight}
                                getRow={(event, number) =>
                                    getRow(
                                        event,
                                        number,
                                        positions,
                                        setPositions,
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
                                    getQuantity(
                                        event,
                                        number,
                                        positions,
                                        setPositions
                                    )
                                }
                                getPrice={(event, number) =>
                                    getPrice(
                                        event,
                                        number,
                                        positions,
                                        setPositions
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
                            total={(array, field) => total(array, field, WB)}
                        />
                        <Total
                            array={positions}
                            field="NDS"
                            name="НДС:"
                            total={(array, field) => total(array, field, WB)}
                        />
                        <Total
                            array={positions}
                            field="total"
                            name="Итого:"
                            total={(array, field) => total(array, field, WB)}
                        />
                    </TotalWrapper>
                </form>
            )}
        </>
    );
}
