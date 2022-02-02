// компонент показывающий список существующих накладных
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Waybill from "./WaybillRow.jsx";
import classes from "./waybillList.module.css";
import { Waybills } from "../utils/waybillsTest.js";
import Loader from "../UI/Loader/Loader.jsx";
import MySelect from "../utils/input/MySelect.jsx";
import MyInput from "../utils/input/MyInput.jsx";

export default function WayBillsList({ CounterPartyType, path }) {
    console.log(CounterPartyType);
    // массив накладных
    const [wb, setWb] = useState([...Waybills]);
    // эмулятор загрузки
    const [loader, setLoader] = useState(true);
    // Порядок фильрации
    const [sortOrder, setSortOrder] = useState(true);
    // Поле поиска
    const [search, setSearch] = useState("counterparty");
    // useRef - запоминаем значение при ререндеринге
    let isCooldown = useRef(false),
        savedArgs = useRef(),
        savedThis = useRef();
    console.log(search);
    // эмуляция загрузки с сервера
    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 1000);
    }, []);

    // сортировки по:
    // - дате
    function sortByDate() {
        sortOrder
            ? setWb([...Waybills.sort((a, b) => a.date - b.date)])
            : setWb([...Waybills.sort((a, b) => b.date - a.date)]);

        setSortOrder(!sortOrder);
    }
    // - контрагенту
    function sortByCtrprty() {
        sortOrder
            ? setWb([
                  ...Waybills.sort((a, b) =>
                      a.counterparty.localeCompare(b.counterparty)
                  ),
              ])
            : setWb([
                  ...Waybills.sort((a, b) =>
                      b.counterparty.localeCompare(a.counterparty)
                  ),
              ]);

        setSortOrder(!sortOrder);
    }
    // - сумме
    function sortBySumm() {
        sortOrder
            ? setWb([...Waybills.sort((a, b) => a.summ - b.summ)])
            : setWb([...Waybills.sort((a, b) => b.summ - a.summ)]);

        setSortOrder(!sortOrder);
    }

    // фильтрующая функция
    function filterList(event) {
        let regexp = new RegExp(`${event.target.value.toLowerCase()}`, "g");
        setWb([
            ...Waybills.filter((item) => {
                return (
                    item[search].toString().toLowerCase().search(regexp) !== -1
                );
            }),
        ]);
    }

    // тормозящий декоратор - оптимизация чтобы не вызывать ререндер на каждое нажатие клавиши при поиске
    function throttle(func) {
        const wrapper = (...args) => {
            if (isCooldown.current) {
                savedArgs.current = args;
                console.log(args);
                return;
            }
            func.apply(this, args);
            isCooldown.current = true;
            setTimeout(() => {
                isCooldown.current = false;
                if (savedArgs.current) {
                    wrapper.apply(savedThis.current, savedArgs.current);
                    savedArgs.current = savedThis.current = null;
                }
            }, 1000);
        };
        return wrapper;
    }

    const filter = throttle(filterList);

    return (
        /* основной контейнер */
        <>
            <div className={classes.content}>
                {/* заголовок */}
                <div className={classes.waybills_header}>
                    {/* фильтр */}
                    <Link to={path}>
                        <div className={classes.waybills_header_add}>
                            <span></span>
                        </div>
                    </Link>
                    <div className={classes.waybills_header_filter}>
                        <div className={classes.waybills_header_filter_name}>
                            Поиск по:
                            <MySelect
                                defaultValue="counterparty"
                                func={(event) => {
                                    setSearch(event.target.value);
                                }}
                                options={[
                                    {
                                        value: "counterparty",
                                        name: CounterPartyType[1],
                                    },
                                    { value: "summ", name: "Сумме" },
                                ]}
                            />
                        </div>
                        <MyInput
                            id="filter_input"
                            placeholder="Поиск..."
                            type="text"
                            getValue={filter}
                        />
                    </div>
                    {/* наименование раздела */}
                    <div className={classes.waybills_header_name}>
                        {CounterPartyType[2]}
                    </div>
                </div>
                {/* шапка */}
                <div className={classes.waybills_list_header}>
                    {/* дата */}
                    <div
                        className={classes.waybills_list_header_date}
                        onClick={sortByDate}
                    >
                        Дата
                    </div>
                    {/* номер */}
                    <div className={classes.waybills_list_header_num}>
                        Номер
                    </div>
                    {/* контрагент */}
                    <div
                        className={classes.waybills_list_header_ctrpty}
                        onClick={sortByCtrprty}
                    >
                        {CounterPartyType[0]}
                    </div>
                    {/* сумма */}
                    <div
                        className={classes.waybills_list_header_summ}
                        onClick={sortBySumm}
                    >
                        Сумма
                    </div>
                </div>
                {/* список накладных */}
                {loader ? (
                    <Loader />
                ) : (
                    wb.map((waybill) => {
                        return (
                            <Waybill
                                key={waybill.number}
                                date={JSON.stringify(waybill.date)}
                                number={waybill.number}
                                counterparty={waybill.counterparty}
                                summ={waybill.summ}
                            />
                        );
                    })
                )}
            </div>
        </>
    );
}
