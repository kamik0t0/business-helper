// компонент показывающий список существующих накладных
import React, { useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import classes from "./styles/waybill-list.module.css";
import Waybill from "./waybill/Waybill.jsx";
import MySelect from "../../../UI/input/MySelect/MySelect.jsx";
import MyInput from "../../../UI/input/MyInput/MyInput.jsx";
import { highlight } from "../../../utils/highlight.js";
import Modal from "../../../UI/modal/modal.jsx";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import PropTypes from "prop-types";
import DeleteWaybill from "../delete-waybill/Delete-waybill.jsx";
import {
    showAnimatedModal,
    hideAnimatedModal,
} from "../../../UI/modal/service/handlers/modal-control.js";
import {
    sortByDate,
    sortByCounterparty,
    sortBySumm,
    sortById,
} from "./service/sorts.js";
import { throttle } from "./service/throttle.js";
import { useDispatch } from "react-redux";

export default function WayBillsList({ CounterpartyInfo, path, WAYBILLS }) {
    const dispatch = useDispatch();
    // Поскольку два HOC компонента (Purchases и Sales) используют данный компонент с разными параметрами, то в зависимости от них используются разные редюсеры; ниже происходит создание массива с соответствующими адресами в зависимости от входного параметра path
    const WaybillsReducerTypePayload =
        path.slice(0, -14) === "/sales"
            ? ["setSales", "SALES", "sales"]
            : ["setPurchases", "PURCHASES", "purchases"];
    const WaybillReducerTypePayload =
        path.slice(0, -14) === "/sales"
            ? ["setSale", "SALE", "sale"]
            : ["setPurchase", "PURCHASE", "purchase"];

    let bills = WAYBILLS;
    // перерендер списка накладных; Данные из redux store передаются в локальный стейт для удобства и реализации фильтрации
    const [waybills, setWaybills] = useState([...bills]);
    // Порядок фильтрации
    const [sortOrder, setSortOrder] = useState(false);
    // модальное окно для удаления накладной
    const [modalDelete, setModalDelete] = useState({ show: false, add: false });
    const [modalUpdate, setModalUpdate] = useState({ show: false, add: false });
    // Поле поиска
    const [search, setSearch] = useState("cl_orgname");
    // Выбрана ли накладная
    const [waybillChosen, setWaybillChosen] = useState(false);

    let isCooldown = useRef(false),
        savedArgs = useRef(),
        savedThis = useRef(),
        // выделенная позиция
        row = useRef(null);
    // фильтр с декоратором
    const filter = throttle(filterList, isCooldown, savedArgs, savedThis);
    // удаление накладной
    function deleteWaybill(event) {
        showAnimatedModal(setModalDelete);
    }

    const sortByDateVoid = () => {
        const sorted = sortByDate(WAYBILLS, sortOrder);
        setSortOrder(!sortOrder);
        setWaybills([...sorted]);
    };
    const sortByIdVoid = () => {
        const sorted = sortById(WAYBILLS, sortOrder);
        setSortOrder(!sortOrder);
        setWaybills([...sorted]);
    };
    const sortBySummVoid = () => {
        const sorted = sortBySumm(WAYBILLS, sortOrder);
        setSortOrder(!sortOrder);
        setWaybills([...sorted]);
    };
    const sortByCounterpartyVoid = () => {
        const sorted = sortByCounterparty(WAYBILLS, sortOrder);
        setSortOrder(!sortOrder);
        setWaybills([...sorted]);
    };
    const getWaybill = (event, number) => {
        console.log(WAYBILLS[number]);
        dispatch({
            type: WaybillReducerTypePayload[1],
            payload: WAYBILLS[number],
        });
    };

    const highlightWaybill = (index) =>
        highlight(
            index,
            WAYBILLS,
            () =>
                dispatch({
                    type: WaybillsReducerTypePayload[1],
                    payload: [...WAYBILLS],
                }),
            row
        );

    function filterList(event) {
        let regexp = new RegExp(`${event.target.value.toLowerCase()}`, "g");
        console.log(regexp);
        setWaybills([
            ...waybills.filter((item) => {
                return (
                    item[search].toString().toLowerCase().search(regexp) !== -1
                );
            }),
        ]);
    }

    const highlightOff = () => {
        dispatch({
            type: WaybillsReducerTypePayload,
            payload: [
                WAYBILLS.forEach((pos) => {
                    if (pos.highlight) {
                        console.log(pos);
                        pos.highlight = false;
                    }
                }),
            ],
        });
    };

    return (
        <>
            {
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
                            <Link to={waybillChosen && "updatewaybill"}>
                                <div
                                    onClick={() => {
                                        highlightOff();
                                        waybillChosen === false &&
                                            showAnimatedModal(setModalUpdate);
                                    }}
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
                                                value: "cl_orgname",
                                                name: CounterpartyInfo[1],
                                            },
                                            { value: "total", name: "Сумме" },
                                        ]}
                                    />
                                </div>
                                <MyInput
                                    id="filter_input"
                                    placeholder="Поиск..."
                                    type="text"
                                    getValue={(event) =>
                                        filter(
                                            event,
                                            bills,
                                            setWaybills,
                                            search
                                        )
                                    }
                                />
                            </div>
                            {/* наименование раздела */}
                            <div className={classes.waybills_header_name}>
                                {CounterpartyInfo[2]}
                            </div>
                        </div>
                        {/* шапка */}
                        <div className={classes.waybills_list_header}>
                            {/* дата */}
                            <div
                                className={classes.waybills_list_header_date}
                                onClick={sortByDateVoid}
                            >
                                Дата
                            </div>
                            {/* номер */}
                            <div
                                className={classes.waybills_list_header_num}
                                onClick={sortByIdVoid}
                            >
                                Номер
                            </div>
                            {/* контрагент */}
                            <div
                                className={classes.waybills_list_header_ctrpty}
                                onClick={sortByCounterpartyVoid}
                            >
                                {CounterpartyInfo[0]}
                            </div>
                            {/* сумма */}
                            <div
                                className={classes.waybills_list_header_summ}
                                onClick={sortBySummVoid}
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
                                        waybill={waybill}
                                        getWaybill={getWaybill}
                                        setWaybillChosen={setWaybillChosen}
                                        highlightWaybill={(index) =>
                                            highlightWaybill(index)
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
                                WAYBILLTYPE={WaybillReducerTypePayload}
                                url={`http://localhost:5600${path.slice(
                                    0,
                                    -14
                                )}`}
                                waybills={WAYBILLS}
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
            }
        </>
    );
}

WayBillsList.propTypes = {
    CounterpartyInfo: PropTypes.array.isRequired,
    path: PropTypes.string.isRequired,
    WAYBILLS: PropTypes.array.isRequired,
};
