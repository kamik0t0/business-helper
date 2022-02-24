// компонент создания накладной
import React, { useEffect, useState, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import classes from "./styles/create-waybill.module.css";
import Position from "./position/Position.jsx";
import { Positions, wbItems } from "../../../utils/wbpositionClass.js";
import { Total, TotalWrapper } from "./total/Total.jsx";
import MyInput from "../../../UI/input/MyInput/MyInput.jsx";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import { getDataByForeignKey } from "../../../utils/getDataByForeignKey";

export default function CreateWaybill({ wbType, path, waybills, setWaybills }) {
    console.log(path);
    const [pos, setPosition] = useState([]);
    const [counter, setCounter] = useState(0);
    const [created, setCreated] = useState(false);
    // useRef - запоминаем значение при ререндеринге
    let delRow = useRef(null);
    // объект накладная для отправки на сервер
    const WB = useRef({
        wbItems: wbItems,
    });

    // при первом рендеринге обнуляются delRow и массив
    useEffect(() => {
        if (wbItems.length > 0) {
            wbItems.length = 0;
            delRow.current = null;
        }
    }, []);

    // добавление строки
    function addRow(event) {
        event.preventDefault();
        setCounter((prev) => prev + 1);
        // добавление объекта строки
        wbItems.push(new Positions(counter));
        setPosition([...wbItems]);
    }

    // считывание и сохранение наименования товара
    function getNomenclature(event, number) {
        let nomenclature = event.target.value;
        wbItems[number - 1].nomenclature = nomenclature;
        console.log(event.target.value);
        console.log(number);
    }

    // считывание и сохранение количества товара
    function getQuantity(event, number) {
        // проверка на отрицательное значение
        let quantity = +event.target.value < 0 ? 0 : +event.target.value;
        wbItems[number - 1].quantity = quantity;
        // рендер
        setPosition([...wbItems]);
    }

    // считывание и сохранение цены товара
    function getPrice(event, number) {
        // проверка на отрицательное значение
        let price = +event.target.value < 0 ? 0 : +event.target.value;
        wbItems[number - 1].price = price;
        // рендер
        setPosition([...wbItems]);
    }

    // выделение позиции
    function getDelRow(event, number) {
        // если позиция не была задана
        if (!delRow.current) {
            // получение номера
            delRow.current = number;
            // подсветка
            wbItems[delRow.current - 1].highlight = true;
            // рендер
            setPosition([...wbItems]);
            return;
        }

        // клик по выделенной позиции
        if (delRow.current === number) return;

        // клик по другой позиции
        if (delRow.current !== number && delRow.current) {
            // снятие выделение с уже выделенной позиции
            wbItems[delRow.current - 1].highlight = false;
            // установка выделения другой позиции
            wbItems[number - 1].highlight = true;
            // сохранение этой позиции
            delRow.current = number;
            // рендер
            setPosition([...wbItems]);
            return;
        }
    }

    // удаление позиции
    function deleteRow(event) {
        event.preventDefault();
        if (delRow.current != null) {
            // удаление из массива
            wbItems.splice(delRow.current - 1, 1);
            // рендер
            setPosition([...wbItems]);
            // обнуление позиции
            delRow.current = null;
        }
    }

    // Подсчёт сумм по накладной и сохранение значения для отправки
    function total(array, field) {
        WB.current[field] = +array.reduce(
            (prev, item) => prev + item[field],
            0
        );
        return WB.current[field];
    }

    async function create(event, url, idType) {
        event.preventDefault();
        WB.current["myOrg"] = JSON.parse(localStorage.getItem("myOrg"));
        WB.current["counterparty"] = JSON.parse(
            localStorage.getItem("counterparty")
        );
        WB.current["counterpartyId"] = localStorage.getItem("counterpartyId");

        console.log(WB.current);
        // отправка запроса
        let response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(WB.current),
        });
        // получение ответа
        let result = await response.json();
        // если в ответе есть поле created
        if (result.created) {
            // запрос на накладные
            let [res] = await getDataByForeignKey(url, idType);
            console.log(res);
            setWaybills(res);

            // навигация к списку накладных
            setCreated(true);
        }
    }

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
                                        "http://localhost:5600" + path,
                                        "CounterpartyId" + path
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
                                    defaultValue={new Date(Date.now())}
                                    getValue={(event) =>
                                        (WB.current.date = new Date(
                                            `${event.target.value}`
                                        ))
                                    }
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
                            <Link to={`/counterparties:${path.slice(1)}`}>
                                <MyButton>Выбрать...</MyButton>
                            </Link>
                        </div>
                        <div className={classes.waybill_form_header_usage}>
                            <MyButton onClick={addRow}>Добавить</MyButton>
                            <MyButton onClick={deleteRow}>Удалить</MyButton>
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
                    {pos.map((item, index) => {
                        return (
                            <Position
                                highlight={item.highlight}
                                getDelRow={getDelRow}
                                key={item.number}
                                classes={classes}
                                number={index + 1}
                                getSumm={item.getSumm.bind(item)}
                                getNDS={item.getNDS.bind(item)}
                                getTotal={item.getTotal.bind(item)}
                                getNomenclature={getNomenclature}
                                getQuantity={getQuantity}
                                getPrice={getPrice}
                            />
                        );
                    })}
                    <TotalWrapper arr={wbItems}>
                        <Total
                            array={wbItems}
                            field="summ"
                            name="Сумма:"
                            total={total}
                        />
                        <Total
                            array={wbItems}
                            field="NDS"
                            name="НДС:"
                            total={total}
                        />
                        <Total
                            array={wbItems}
                            field="total"
                            name="Итого:"
                            total={total}
                        />
                    </TotalWrapper>
                </form>
            )}
        </>
    );
}
