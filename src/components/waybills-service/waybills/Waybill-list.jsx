// компонент показывающий список существующих накладных
import React, { useState, useRef, useContext } from "react";
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
    sortByDate,
    sortByCounterparty,
    sortBySumm,
    sortById,
} from "./service/sorts.js";
import { throttle } from "./service/throttle.js";
import { useDispatch, useSelector } from "react-redux";
import { setWaybillAction } from "../../../redux/waybill-reducer.js";
import { ModalContext } from "../../../blocks/content/Main.jsx";
import { modalManager } from "../../../UI/modal/service/handlers/modal-control.js";

export default function WayBillsList({ CounterpartyInfo, path, WAYBILLS }) {
    const dispatch = useDispatch();
    const type = path.slice(0, -14) === "/sales" ? "SALES" : "PURCHASES";
    const WAYBILL = useSelector((state) => state.setWaybill.waybill);
    // работа с локальным стейтом для реализации сортировки и фильтрации, т.е. отображение результатов фильтрации не должно влиять на глобальное хринилище данных в redux
    const [waybills, setWaybills] = useState([...WAYBILLS]);
    // Порядок фильтрации
    const [sortOrder, setSortOrder] = useState(false);
    // Поле поиска
    const [search, setSearch] = useState("cl_orgname");
    const { modalDelete, modalUpdate, setModalDelete, setModalUpdate } =
        useContext(ModalContext);

    const [showUpdateModal, hideUpdateModal] = modalManager(setModalUpdate),
        [showDeleteModal] = modalManager(setModalDelete);

    let isCooldown = useRef(false),
        savedArgs = useRef(),
        savedThis = useRef(),
        // выделенная позиция
        row = useRef(null);

    // различные варианты сортировки
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
        dispatch(setWaybillAction(WAYBILLS[number]));
    };

    // фильтрация
    function filterList(event) {
        let regexp = new RegExp(`${event.target.value.toLowerCase()}`, "g");
        console.log(regexp);
        const filtered = WAYBILLS.filter(
            (item) =>
                item[search].toString().toLowerCase().search(regexp) !== -1
        );

        setWaybills([...filtered]);
    }
    // фильтр с декоратором
    const filter = throttle(filterList, isCooldown, savedArgs, savedThis);

    const highlightOFF = (WAYBILLS) => {
        return async function () {
            const waybills = WAYBILLS;
            waybills.forEach((pos) => {
                if (pos.highlight === true) pos.highlight = false;
            });
            dispatch({
                type,
                payload: [...waybills],
            });
        };
    };

    const highlightON = (index) =>
        highlight(
            index,
            WAYBILLS,
            () =>
                dispatch({
                    type,
                    payload: [...WAYBILLS],
                }),
            row
        );

    return (
        <>
            {
                <>
                    <div className={classes.content}>
                        <div className={classes.waybills_header}>
                            <Link to={path}>
                                <div
                                    onClick={() =>
                                        dispatch(highlightOFF(WAYBILLS))
                                    }
                                    className={classes.waybills_header_add}
                                >
                                    <span></span>
                                </div>
                            </Link>
                            <div
                                onClick={showDeleteModal}
                                className={classes.waybills_header_delete}
                            >
                                <span></span>
                            </div>
                            <Link
                                to={
                                    Object.keys(WAYBILL).length > 0 &&
                                    "updatewaybill"
                                }
                            >
                                <div
                                    onClick={() => {
                                        dispatch(highlightOFF(WAYBILLS));
                                        Object.keys(WAYBILL).length === 0 &&
                                            showUpdateModal();
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
                                    getValue={(event) => filter(event)}
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
                                        highlightON={(index) =>
                                            highlightON(index)
                                        }
                                    />
                                );
                            })}
                    </div>
                    {modalDelete.show && (
                        <Modal
                            size={{ height: "25vh", width: "40vw" }}
                            active={modalDelete.add}
                            setModal={setModalDelete}
                        >
                            <DeleteWaybill
                                setModal={setModalDelete}
                                path={path}
                                setWaybills={setWaybills}
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
                                <MyButton onClick={hideUpdateModal}>
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
