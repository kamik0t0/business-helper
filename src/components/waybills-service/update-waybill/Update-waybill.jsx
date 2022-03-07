import React, { useState, useRef, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import classes from "../styles/update-waybill.module.css";
import Position from "../create-waybill/position/Position.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import PositionHeaders from "../common/Position-headers.jsx";
import { Positions } from "../../../utils/wbpositionClass.js";
import { Total, TotalWrapper } from "../create-waybill/total/Total.jsx";
import MyInput from "../../../UI/input/MyInput/MyInput.jsx";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import { update } from "./service/update.js";
import {
    addRow,
    getNomenclature,
    getQuantity,
    getPrice,
    getRow,
    deleteRow,
    total,
    makeDate,
} from "../create-waybill/service/handlers.js";
import {
    getCounterpartyRequisitesFromWaybill,
    getPositions,
} from "./service/handlers";
import PropTypes from "prop-types";

export default function UpdateWaybill({ CounterPartyType, path }) {
    // индикатор загрузки
    const [loader, setLoader] = useState(true);
    // рендер позиций
    const [positions, setPositions] = useState([]);
    // счетчик позиций
    const [counter, setCounter] = useState(0);
    // редирект к списку если накладная обновлена
    const [navToList, setNavToList] = useState(false);
    // активная позиция
    const row = useRef(null);
    // объект накладная для отправки на сервер
    const PatchWaybillObj = useRef({});
    // контрагент из localStorage
    const counterparty = getCounterpartyRequisitesFromWaybill(
        JSON.parse(localStorage.getItem(CounterPartyType[2]))
    );
    // id накладной
    const WaybillId = JSON.parse(localStorage.getItem(CounterPartyType[2])).id;
    // дата накладной
    const Waybill_date = JSON.parse(
        localStorage.getItem(CounterPartyType[2])
    ).waybill_date;

    useEffect(async () => {
        // заполнение стартового массива позиций и новый рендер
        if (positions.length === 0) {
            const PositionsFromDB = await getPositions(path);
            let startArr = [];
            for (const position of PositionsFromDB) {
                startArr.push(
                    new Positions(
                        position.item_number,
                        position.nomenclature,
                        position.quantity,
                        position.price,
                        position.summ,
                        position.nds,
                        position.total,
                        position.id
                    )
                );
            }
            setPositions([...startArr]);
            setCounter(startArr.length);
            setLoader(false);
        }
    }, []);

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
                                    update(
                                        event,
                                        `http://localhost:5600${path}/?OrgId=${localStorage.getItem(
                                            "OrgsId"
                                        )}`,
                                        path.slice(1),
                                        PatchWaybillObj,
                                        positions,
                                        setNavToList,
                                        localStorage.getItem("waybillDate") ===
                                            null || undefined
                                            ? Waybill_date
                                            : localStorage.getItem(
                                                  "waybillDate"
                                              ),
                                        localStorage.getItem("counterparty") ===
                                            null || undefined
                                            ? counterparty
                                            : JSON.parse(
                                                  localStorage.getItem(
                                                      "counterparty"
                                                  )
                                              ),
                                        WaybillId
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
                                {CounterPartyType[0]}
                            </div>
                            <Link to={path}>
                                <MyButton>Закрыть</MyButton>
                            </Link>
                        </div>
                        <div className={classes.waybill_form_header_date}>
                            <MyInput
                                id="waybillDate"
                                name="Дата:"
                                type="date"
                                defaultValue={
                                    localStorage.getItem("waybillDate") ===
                                        null || undefined
                                        ? Waybill_date.slice(0, -14)
                                        : localStorage
                                              .getItem("waybillDate")
                                              .slice(0, -14)
                                }
                                getValue={(event) => {
                                    PatchWaybillObj.current["date"] = `${
                                        event.target.value
                                    }${makeDate()}`;
                                    localStorage.setItem(
                                        "waybillDate",
                                        PatchWaybillObj.current["date"]
                                    );
                                }}
                            />
                            {path === "/purchases" && (
                                <MyInput
                                    name={CounterPartyType[3] + ": "}
                                    type="text"
                                    defaultValue={
                                        JSON.parse(
                                            localStorage.getItem("Purchase")
                                        ).cl_waybill_number
                                    }
                                    getValue={(event) => {
                                        PatchWaybillObj.current[
                                            "cl_waybill_number"
                                        ] = event.target.value;
                                    }}
                                    style={{ width: "145px" }}
                                />
                            )}
                            <MyInput
                                style={{ width: "350px" }}
                                name={CounterPartyType[1] + ":"}
                                type="text"
                                defaultValue={
                                    JSON.parse(
                                        localStorage.getItem("counterparty")
                                    ) === null || undefined
                                        ? JSON.parse(
                                              localStorage.getItem(
                                                  CounterPartyType[2]
                                              )
                                          ).cl_orgname
                                        : JSON.parse(
                                              localStorage.getItem(
                                                  "counterparty"
                                              )
                                          ).orgname
                                }
                                getValue={(event) =>
                                    (PatchWaybillObj.current.counterparty =
                                        event.target.value)
                                }
                            />
                            <Link
                                to={`/counterparties:${path.slice(
                                    1
                                )}:updatewaybill`}
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
                    {loader ? (
                        <Loader />
                    ) : (
                        positions.map((item, index) => {
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
                                    key={item.number + item.nomenclature}
                                    classes={classes}
                                    number={index}
                                    getSumm={item.getSumm.bind(item)}
                                    getNDS={item.getNDS.bind(item)}
                                    getTotal={item.getTotal.bind(item)}
                                    getNomenclature={(event, number) =>
                                        getNomenclature(
                                            event,
                                            number,
                                            positions
                                        )
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
                                    nomenclature={item.nomenclature}
                                    quantity={item.quantity}
                                    price={+item.price}
                                />
                            );
                        })
                    )}
                    <TotalWrapper arr={positions}>
                        <Total
                            array={positions}
                            field="summ"
                            name="Сумма:"
                            total={(array, field) =>
                                total(array, field, PatchWaybillObj)
                            }
                        />
                        <Total
                            array={positions}
                            field="NDS"
                            name="НДС:"
                            total={(array, field) =>
                                total(array, field, PatchWaybillObj)
                            }
                        />
                        <Total
                            array={positions}
                            field="total"
                            name="Итого:"
                            total={(array, field) =>
                                total(array, field, PatchWaybillObj)
                            }
                        />
                    </TotalWrapper>
                </form>
            )}
        </>
    );
}

UpdateWaybill.propTypes = {
    CounterPartyType: PropTypes.array.isRequired,
    path: PropTypes.string.isRequired,
};
