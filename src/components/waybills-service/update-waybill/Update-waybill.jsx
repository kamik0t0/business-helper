import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import PropTypes from "prop-types";
import { getData } from "../../../utils/getData.js";
import { setAuthAction } from "../../../redux/auth-reducer.js";
import { setWaybillAction } from "../../../redux/waybill-reducer.js";

export default function UpdateWaybill({ CounterpartyInfo, path }) {
    const { pathname } = window.location;
    const resolvedPath = pathname.endsWith("/")
        ? pathname.slice(0, -1)
        : pathname;
    const dispatch = useDispatch();
    const MYORG = useSelector((state) => state.setMyOrgReducer.myOrg);
    const type = path === "/sales" ? "SaleId" : "PurchaseId";
    const WAYBILL = useSelector((state) => state.setWaybill.waybill);
    const COUNTERPARTY = useSelector(
        (state) => state.setCounterpartyReducer.counterparty
    );
    // объект накладная для отправки на сервер
    const UpdateWaybill = useRef({
        waybill_date: WAYBILL.waybill_date,
        counterparty: COUNTERPARTY,
        counterpartyId: COUNTERPARTY.CounterpartyId || COUNTERPARTY.id,
        MYORG,
    });

    const DATE = WAYBILL.waybill_date.slice(0, -14);
    const id = WAYBILL.id;
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
            const slicedPath = path.slice(0, -1);
            // заполнение стартового массива позиций и новый рендер
            if (positions.length === 0) {
                try {
                    const PositionsFromDB = await getData(
                        process.env.REACT_APP_URL_BASE + slicedPath,
                        {
                            [type]: id,
                        },
                        () => dispatch(setAuthAction(true))
                    );
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
                                    dispatch(
                                        update(
                                            event,
                                            path,
                                            UpdateWaybill,
                                            () => setNavToList(true),
                                            WAYBILL.id,
                                            positions
                                        )
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
                                <MyButton
                                    onClick={() =>
                                        dispatch(setWaybillAction({}))
                                    }
                                >
                                    Закрыть
                                </MyButton>
                            </Link>
                        </div>
                        <div className={classes.waybill_form_header_date}>
                            <MyInput
                                id="waybillDate"
                                name="Дата:"
                                type="date"
                                defaultValue={DATE}
                                getValue={(event) => {
                                    UpdateWaybill.current["waybill_date"] =
                                        `${event.target.value}${makeDate()}` ||
                                        DATE;
                                    console.log(
                                        UpdateWaybill.current["waybill_date"]
                                    );
                                }}
                            />
                            {path === "/purchases" && (
                                <MyInput
                                    name={CounterpartyInfo[3] + ": "}
                                    type="text"
                                    defaultValue={WAYBILL.cl_waybill_number}
                                    getValue={(event) => {
                                        UpdateWaybill.current[
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
                                defaultValue={
                                    COUNTERPARTY.orgname || WAYBILL.cl_orgname
                                }
                                getValue={(event) =>
                                    (UpdateWaybill.current["counterparty"] =
                                        COUNTERPARTY)
                                }
                            />
                            <Link to={`${resolvedPath}/counterparties`}>
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
                                total(array, field, UpdateWaybill)
                            }
                        />
                        <Total
                            array={positions}
                            field="NDS"
                            name="НДС:"
                            total={(array, field) =>
                                total(array, field, UpdateWaybill)
                            }
                        />
                        <Total
                            array={positions}
                            field="total"
                            name="Итого:"
                            total={(array, field) =>
                                total(array, field, UpdateWaybill)
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
