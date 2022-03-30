// компонент создания накладной
import React, { useState, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import classes from "../styles/update-waybill.module.css";
import Position from "./position/Position.jsx";
import PositionHeaders from "../common/Position-headers.jsx";
import { Positions } from "../../../utils/wbpositionClass.js";
import { Total, TotalWrapper } from "./total/Total.jsx";
import MyInput from "../../../UI/input/MyInput/MyInput.jsx";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import { create } from "./service/create.js";
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
import PropTypes from "prop-types";

export default function CreateWaybill({ CounterpartyType, path }) {
    console.log(CounterpartyType);
    // массив позиций в накладной
    const [positions, setPositions] = useState([]);
    // номер позиции
    const [counter, setCounter] = useState(0);
    // редирект к списку если накладная создана
    const [navToList, setNavToList] = useState(false);
    // useRef - запоминаем значение при ререндеринге
    let row = useRef(null);
    // объект накладная для отправки на сервер
    const PostWaybillObj = useRef({ date: makeDefaultDate() });

    return (
        <>
            {navToList ? (
                <Navigate to={path} />
            ) : (
                <form className={classes.content}>
                    <div className={classes.waybill_form_header}>
                        <div className={classes.waybill_form_header_save}>
                            <MyButton
                                onClick={(event) =>
                                    create(
                                        event,
                                        `http://localhost:5600${path}/?table=${path.slice(
                                            1
                                        )}&OrgId=${localStorage.getItem(
                                            "OrgsId"
                                        )}`,
                                        path.slice(1),
                                        PostWaybillObj,
                                        positions,
                                        setNavToList
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
                                {CounterpartyType[0]}
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
                                        PostWaybillObj.current.date ===
                                        undefined
                                            ? null
                                            : PostWaybillObj.current.date.slice(
                                                  0,
                                                  -14
                                              )
                                    }
                                    getValue={(event) => {
                                        PostWaybillObj.current.date =
                                            `${
                                                event.target.value
                                            }${makeDate()}` ||
                                            PostWaybillObj.current.date;
                                    }}
                                />
                            </div>
                            {path === "/purchases" && (
                                <MyInput
                                    name={CounterpartyType[2] + ": "}
                                    type="text"
                                    getValue={(event) => {
                                        PostWaybillObj.current[
                                            "cl_waybill_number"
                                        ] = event.target.value;
                                    }}
                                    style={{ width: "145px" }}
                                />
                            )}
                            <MyInput
                                style={{ width: "350px" }}
                                name={CounterpartyType[1]}
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
                                    (PostWaybillObj.current.counterparty =
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

                    <PositionHeaders />
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
                            total={(array, field) =>
                                total(array, field, PostWaybillObj)
                            }
                        />
                        <Total
                            array={positions}
                            field="NDS"
                            name="НДС:"
                            total={(array, field) =>
                                total(array, field, PostWaybillObj)
                            }
                        />
                        <Total
                            array={positions}
                            field="total"
                            name="Итого:"
                            total={(array, field) =>
                                total(array, field, PostWaybillObj)
                            }
                        />
                    </TotalWrapper>
                </form>
            )}
        </>
    );
}

CreateWaybill.propTypes = {
    CounterpartyType: PropTypes.array.isRequired,
    path: PropTypes.string.isRequired,
};
