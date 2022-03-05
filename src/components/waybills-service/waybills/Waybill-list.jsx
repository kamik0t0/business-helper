// компонент показывающий список существующих накладных
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import classes from "./styles/waybill-list.module.css";
import Waybill from "./waybill/Waybill.jsx";
import MySelect from "../../../UI/input/MySelect/MySelect.jsx";
import MyInput from "../../../UI/input/MyInput/MyInput.jsx";
import MyLink from "../../../UI/link/MyLink.jsx";
import { useSelector } from "react-redux";
import { highlight } from "../../../utils/highlight.js";
import Modal from "../../../UI/modal/modal.jsx";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import DeleteWaybill from "../delete-waybill/Delete-waybill.jsx";
import {
    showAnimatedModal,
    hideAnimatedModal,
} from "../../../UI/modal/service/handlers/modal-control.js";

export default function WayBillsList({
    CounterPartyType,
    path,
    waybills,
    setWaybills,
}) {
    console.log(waybills);
    console.log(path);
    const isMyOrgSelected = useSelector(
        (state) => state.myOrgReducer.isMyOrgSelected
    );
    // Порядок фильтрации
    const [sortOrder, setSortOrder] = useState(true);
    // модальное окно для удаления накладной
    const [modalDelete, setModalDelete] = useState({ show: false, add: false });
    const [modalUpdate, setModalUpdate] = useState({ show: false, add: false });
    // Поле поиска
    const [search, setSearch] = useState("counterparty");
    // Выбрана ли накладная
    const [Waybill_chosen, setWaybill_chosen] = useState(false);
    // useRef - запоминаем значение при ререндеринге
    let isCooldown = useRef(false),
        savedArgs = useRef(),
        savedThis = useRef(),
        row = useRef(null),
        waybill = useRef(null);

    useEffect(() => {
        switch (path) {
            case "/sales/createwaybill":
                setWaybills(JSON.parse(localStorage.getItem("Sales")));
                break;
            case "/purchases/createwaybill":
                setWaybills(JSON.parse(localStorage.getItem("Purchases")));
                break;

            default:
                break;
        }
    }, []);
    // сортировки по:
    // - дате
    function sortByDate() {
        console.log(waybills);
        sortOrder
            ? setWaybills([
                  ...waybills.sort(
                      (a, b) =>
                          Date.parse(a.waybill_date) -
                          Date.parse(b.waybill_date)
                  ),
              ])
            : setWaybills([
                  ...waybills.sort(
                      (a, b) =>
                          Date.parse(b.waybill_date) -
                          Date.parse(a.waybill_date)
                  ),
              ]);

        setSortOrder(!sortOrder);
    }
    // - контрагенту
    function sortByCtrprty() {
        sortOrder
            ? setWaybills([
                  ...waybills.sort((a, b) =>
                      a.cl_orgname.localeCompare(b.cl_orgname)
                  ),
              ])
            : setWaybills([
                  ...waybills.sort((a, b) =>
                      b.cl_orgname.localeCompare(a.cl_orgname)
                  ),
              ]);

        setSortOrder(!sortOrder);
    }
    // - сумме
    function sortBySumm() {
        sortOrder
            ? setWaybills([...waybills.sort((a, b) => a.summ - b.summ)])
            : setWaybills([...waybills.sort((a, b) => b.summ - a.summ)]);

        setSortOrder(!sortOrder);
    }
    // - id
    function sortById() {
        sortOrder
            ? setWaybills([...waybills.sort((a, b) => a.id - b.id)])
            : setWaybills([...waybills.sort((a, b) => b.id - a.id)]);

        setSortOrder(!sortOrder);
    }

    // фильтрующая функция
    function filterList(event) {
        let regexp = new RegExp(`${event.target.value.toLowerCase()}`, "g");
        setWaybills([
            ...waybills.filter((item) => {
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

    function getWaybill(event, number) {
        waybill.current = waybills[number];
        switch (path) {
            case "/sales/createwaybill":
                localStorage.setItem("Sale", JSON.stringify(waybills[number]));
                break;
            case "/purchases/createwaybill":
                localStorage.setItem(
                    "Purchase",
                    JSON.stringify(waybills[number])
                );
                break;
            default:
                break;
        }
    }

    function deleteWaybill(event) {
        showAnimatedModal(setModalDelete);
        console.log(waybill.current);
    }

    return (
        /* основной контейнер */
        <>
            {isMyOrgSelected ? (
                <>
                    <div className={classes.content}>
                        <div className={classes.waybills_header}>
                            <Link to={path}>
                                <div className={classes.waybills_header_add}>
                                    <span></span>
                                </div>
                            </Link>
                            <div
                                onClick={(event) => deleteWaybill(event, row)}
                                className={classes.waybills_header_delete}
                            >
                                <span></span>
                            </div>
                            <Link to={Waybill_chosen && "updatewaybill"}>
                                <div
                                    onClick={() =>
                                        Waybill_chosen === false &&
                                        showAnimatedModal(setModalUpdate)
                                    }
                                    className={classes.waybills_header_redact}
                                >
                                    <div
                                        className={
                                            classes.waybills_header_redact_icon
                                        }
                                    ></div>
                                </div>
                            </Link>

                            <div className={classes.waybills_header_filter}>
                                <div
                                    className={
                                        classes.waybills_header_filter_name
                                    }
                                >
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
                            <div
                                className={classes.waybills_list_header_num}
                                onClick={sortById}
                            >
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
                        {waybills.length > 0 &&
                            waybills.map((waybill, index) => {
                                return (
                                    <Waybill
                                        key={uuid()}
                                        index={index}
                                        date={waybill.waybill_date}
                                        number={waybill.id}
                                        counterparty={waybill.cl_orgname}
                                        summ={waybill.summ}
                                        getWaybill={getWaybill}
                                        highlight={waybill.highlight}
                                        setWaybill_chosen={setWaybill_chosen}
                                        highlightWaybill={(index) =>
                                            highlight(
                                                index,
                                                waybills,
                                                setWaybills,
                                                row
                                            )
                                        }
                                    />
                                );
                            })}
                    </div>
                    {modalDelete.show && (
                        <Modal
                            size={{ height: "25vh", width: "40vw" }}
                            active={modalDelete.add}
                            setActive={setModalDelete}
                        >
                            <DeleteWaybill
                                setModal={setModalDelete}
                                waybill={waybill.current}
                                url={`http://localhost:5600${path.slice(
                                    0,
                                    -14
                                )}`}
                                waybills={waybills}
                                setWaybills={setWaybills}
                                path={path}
                                noselected="Накладная не выбрана"
                            />
                        </Modal>
                    )}
                    {modalUpdate.show && (
                        <Modal
                            size={{ height: "25vh", width: "40vw" }}
                            active={modalUpdate.add}
                            setActive={setModalUpdate}
                        >
                            <div className={classes.noorg}>
                                <div className={classes.noorg__text}>
                                    Накладная не выбрана
                                </div>
                                <MyButton
                                    onClick={() =>
                                        hideAnimatedModal(setModalUpdate)
                                    }
                                >
                                    Закрыть
                                </MyButton>
                            </div>
                        </Modal>
                    )}
                </>
            ) : (
                <div className={classes.content}>
                    <div className={classes.nocounterparties}>
                        Выберите организацию в
                        <MyLink path="/private"> личном кабинете</MyLink> или{" "}
                        <MyLink path="/login"> авторизуйтесь</MyLink>
                    </div>
                </div>
            )}
        </>
    );
}
