import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
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
import { highlight } from "../../../utils/highlight.js";
import {
    getNomenclature,
    getQuantity,
    getPrice,
    total,
    makeDate,
} from "../create-waybill/service/handlers.js";
import {
    getCounterpartyRequisitesFromWaybill,
    getPositions,
} from "./service/handlers";
import PropTypes from "prop-types";

export default function UpdateWaybill({ CounterpartyInfo, path }) {
    const myOrg = useSelector((state) => state.setMyOrgReducer.myOrg);
    console.log(path);
    const WaybillData =
        path === "/sales"
            ? ["setSale", "SALE", "sale"]
            : ["setPurchase", "PURCHASE", "purchase"];
    const WAYBILL = useSelector(
        (state) => state[`${WaybillData[0]}`][`${WaybillData[2]}`]
    );
    const CUOUNTERPARTY = useSelector(
        (state) => state.setCounterpartyReducer.counterparty
    );
    console.log(WAYBILL);
    const DATE = WAYBILL?.waybill_date?.slice(0, -14);
    const id = WAYBILL?.id;
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
    // const counterparty = getCounterpartyRequisitesFromWaybill(WAYBILL);
    // // id накладной
    // const WaybillId = WAYBILL.id;
    // // дата накладной

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

    useEffect(() => {
        async function fillStartPositions() {
            // заполнение стартового массива позиций и новый рендер
            if (positions.length === 0) {
                try {
                    const PositionsFromDB = await getPositions(path, id);
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
                } catch (error) {
                    console.log(error);
                }
            }
        }

        fillStartPositions();
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
                                        `http://localhost:5600${path}/`,
                                        path.slice(1),
                                        PatchWaybillObj,
                                        positions,
                                        () => setNavToList(true),
                                        WAYBILL.waybill_date,
                                        CUOUNTERPARTY,
                                        WAYBILL.id,
                                        myOrg
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
                                {CounterpartyInfo[0]}
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
                                defaultValue={DATE}
                                getValue={(event) =>
                                    (PatchWaybillObj.current["date"] = `${
                                        event.target.value
                                    }${makeDate()}`)
                                }
                            />
                            {path === "/purchases" && (
                                <MyInput
                                    name={CounterpartyInfo[3] + ": "}
                                    type="text"
                                    defaultValue={WAYBILL.cl_waybill_number}
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
                                name={CounterpartyInfo[1] + ":"}
                                type="text"
                                defaultValue={WAYBILL.cl_orgname}
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
                            <MyButton onClick={addRow}>Добавить</MyButton>
                            <MyButton onClick={deleteRow}>Удалить</MyButton>
                        </div>
                    </div>
                    <PositionHeaders />
                    {loader ? (
                        <Loader />
                    ) : (
                        positions.map((item, index) => {
                            return (
                                <Position
                                    key={item.number + item.nomenclature}
                                    item={item}
                                    highlight={item.highlight}
                                    getRow={(event, number) =>
                                        highlight(
                                            number,
                                            positions,
                                            () => setPositions([...positions]),
                                            row
                                        )
                                    }
                                    number={index}
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
                                            () => setPositions([...positions])
                                        )
                                    }
                                    getPrice={(event, number) =>
                                        getPrice(event, number, positions, () =>
                                            setPositions([...positions])
                                        )
                                    }
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
    CounterpartyInfo: PropTypes.array.isRequired,
    path: PropTypes.string.isRequired,
};
