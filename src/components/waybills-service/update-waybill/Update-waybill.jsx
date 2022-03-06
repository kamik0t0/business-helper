import React, { useState, useRef, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import classes from "./styles/update-waybill.module.css";
import Position from "../create-waybill/position/Position.jsx";
import { Positions } from "../../../utils/wbpositionClass.js";
import { Total, TotalWrapper } from "../create-waybill/total/Total.jsx";
import MyInput from "../../../UI/input/MyInput/MyInput.jsx";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import { update } from "./service/update.js";
import { v4 as uuid } from "uuid";
import {
    getSaleItemsFromDB,
    getPurchaseItemsFromDB,
} from "../../../utils/getDataByForeignKey.js";
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

export default function UpdateWaybill({ CounterPartyType, path }) {
    console.log(CounterPartyType, path);
    const [positions, setPositions] = useState([]);
    const [counter, setCounter] = useState(0);
    const [updated, setUpdated] = useState(false);
    let row = useRef(null);
    const Waybill = useRef({});
    const SaleId = JSON.parse(localStorage.getItem(CounterPartyType[2])).id;
    const Waybill_date = JSON.parse(
        localStorage.getItem(CounterPartyType[2])
    ).waybill_date;
    const counterparty = getCounterpartyRequisitesFromWaybill(
        JSON.parse(localStorage.getItem(CounterPartyType[2]))
    );

    function getCounterpartyRequisitesFromWaybill(waybill) {
        return Object.fromEntries(
            Object.entries(waybill).filter(
                (obj) =>
                    Object.values(obj)[0].includes("cl_") ||
                    Object.values(obj)[0].includes("CounterpartyId")
            )
        );
    }

    useEffect(async () => {
        let result;
        if (positions.length === 0) {
            switch (path) {
                case "/sales":
                    result = await getSaleItemsFromDB(
                        `http://localhost:5600${path.slice(0, -1)}/?SaleId=${
                            JSON.parse(localStorage.getItem("Sale")).id
                        }`
                    );
                    break;
                case "/purchases":
                    result = await getPurchaseItemsFromDB(
                        `http://localhost:5600${path.slice(
                            0,
                            -1
                        )}/?PurchaseId=${
                            JSON.parse(localStorage.getItem("Purchase")).id
                        }`
                    );
                    break;

                default:
                    break;
            }
            // setPositions(result);
            console.log(result);
            let startArr = [];
            for (const position of result) {
                console.log(position.nomenclature);
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
            console.log(startArr);

            setPositions([...startArr]);
            setCounter(startArr.length);
        }
    }, []);

    return (
        <>
            {updated ? (
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
                                        Waybill,
                                        positions,
                                        setUpdated,
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
                                        SaleId
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
                                    Waybill.current["date"] = `${
                                        event.target.value
                                    }${makeDate()}`;
                                    localStorage.setItem(
                                        "waybillDate",
                                        Waybill.current["date"]
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
                                        Waybill.current["cl_waybill_number"] =
                                            event.target.value;
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
                                    (Waybill.current.counterparty =
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
                                nomenclature={item.nomenclature}
                                quantity={item.quantity}
                                price={item.price}
                            />
                        );
                    })}
                    <TotalWrapper arr={positions}>
                        <Total
                            array={positions}
                            field="summ"
                            name="Сумма:"
                            total={(array, field) =>
                                total(array, field, Waybill)
                            }
                        />
                        <Total
                            array={positions}
                            field="NDS"
                            name="НДС:"
                            total={(array, field) =>
                                total(array, field, Waybill)
                            }
                        />
                        <Total
                            array={positions}
                            field="total"
                            name="Итого:"
                            total={(array, field) =>
                                total(array, field, Waybill)
                            }
                        />
                    </TotalWrapper>
                </form>
            )}
        </>
    );
}
