// компонент создания накладной
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import classes from "./newWaybill.module.css";
import WbPosition from "./Wb-position.jsx";
import { Position, wbItems } from "../../utils/wbpositionClass.js";
import Total from "./Wb-total";
import TotalWrapper from "./Wb-total-wrapper.js";
import MyInput from "../../UI/input/MyInput/MyInput.jsx";
import MyButton from "../../UI/input/MyButton/MyButton.jsx";

export default function NewWaybill({ wbType, path /* , wbItems  */ }) {
    const [pos, setPosition] = useState([]);
    const [counter, setCounter] = useState(0);
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
        wbItems.push(new Position(counter));
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

    return (
        <form className={classes.content}>
            <div className={classes.waybill_form_header}>
                <div className={classes.waybill_form_header_save}>
                    {" "}
                    <MyButton>Сохранить</MyButton>
                    <MyButton>Excel</MyButton>
                    <div className={classes.waybill_form_header_save_name}>
                        {wbType[0]}
                    </div>
                    <Link to={path}>
                        <MyButton>Закрыть</MyButton>
                    </Link>
                </div>
                <div className={classes.waybill_form_header_date}>
                    <div className={classes.waybill_form_header_date_date}>
                        <MyInput
                            id="waybillDate"
                            name="Дата:"
                            type="date"
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
                        getValue={(event) =>
                            (WB.current.counterparty = event.target.value)
                        }
                    />
                    <Link to="/counterparties">
                        <MyButton style={{ width: "30px" }}>...</MyButton>
                    </Link>
                </div>
                <div className={classes.waybill_form_header_usage}>
                    <MyButton onClick={addRow}>Добавить</MyButton>
                    <MyButton onClick={deleteRow}>Удалить</MyButton>
                </div>
            </div>

            <div className={classes.waybill_form_wb_header}>
                <div className={classes.waybill_form_wb_header_number}>№</div>
                <div className={classes.waybill_form_wb_header_nomenclature}>
                    Номенклатура
                </div>
                <div className={classes.waybill_form_wb_header_quantity}>
                    Кол.
                </div>
                <div className={classes.waybill_form_wb_header_price}>Цена</div>
                <div className={classes.waybill_form_wb_header_summ}>Сумма</div>
                <div className={classes.waybill_form_wb_header_NDSprcnt}>%</div>
                <div className={classes.waybill_form_wb_header_NDS}>НДС</div>
                <div className={classes.waybill_form_wb_header_total}>
                    Всего
                </div>
            </div>
            {pos.map((item, index) => {
                return (
                    <WbPosition
                        highlight={item.highlight}
                        getDelRow={getDelRow}
                        key={item.number}
                        classes={classes}
                        number={index + 1}
                        summ={item.summ}
                        NDS={item.NDS}
                        total={item.total}
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
                <Total array={wbItems} field="NDS" name="НДС:" total={total} />
                <Total
                    array={wbItems}
                    field="total"
                    name="Итого:"
                    total={total}
                />
            </TotalWrapper>
        </form>
    );
}
