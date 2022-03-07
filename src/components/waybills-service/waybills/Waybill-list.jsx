// компонент показывающий список существующих накладных
import React, { useState, useRef, useEffect } from "react";
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
    sortByCtrprty,
    sortBySumm,
    sortById,
} from "./service/hanlders.js";
import { throttle, filterList } from "./service/hanlders.js";

export default function WayBillsList({ CounterPartyType, path, WB }) {
    let bills = WB;
    // перерендер списка накладных
    const [waybills, setWaybills] = useState([...bills]);
    // Порядок фильтрации
    const [sortOrder, setSortOrder] = useState(true);
    // модальное окно для удаления накладной
    const [modalDelete, setModalDelete] = useState({ show: false, add: false });
    const [modalUpdate, setModalUpdate] = useState({ show: false, add: false });
    // Поле поиска
    const [search, setSearch] = useState("cl_orgname");
    // Выбрана ли накладная
    const [waybillChosen, setWaybillChosen] = useState(false);
    const waybill = useRef(null);

    let isCooldown = useRef(false),
        savedArgs = useRef(),
        savedThis = useRef(),
        // выделенная позиция
        row = useRef(null);
    // фильтр с декоратором
    const filter = throttle(filterList, isCooldown, savedArgs, savedThis);
    // получение накладной
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
    // удаление накладной
    function deleteWaybill(event) {
        showAnimatedModal(setModalDelete);
        console.log(waybill.current);
    }

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
                                    onClick={() =>
                                        waybillChosen === false &&
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
                                                value: "cl_orgname",
                                                name: CounterPartyType[1],
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
                                {CounterPartyType[2]}
                            </div>
                        </div>
                        {/* шапка */}
                        <div className={classes.waybills_list_header}>
                            {/* дата */}
                            <div
                                className={classes.waybills_list_header_date}
                                onClick={() =>
                                    sortByDate(
                                        waybills,
                                        setWaybills,
                                        sortOrder,
                                        setSortOrder
                                    )
                                }
                            >
                                Дата
                            </div>
                            {/* номер */}
                            <div
                                className={classes.waybills_list_header_num}
                                onClick={() =>
                                    sortById(
                                        waybills,
                                        setWaybills,
                                        sortOrder,
                                        setSortOrder
                                    )
                                }
                            >
                                Номер
                            </div>
                            {/* контрагент */}
                            <div
                                className={classes.waybills_list_header_ctrpty}
                                onClick={() =>
                                    sortByCtrprty(
                                        waybills,
                                        setWaybills,
                                        sortOrder,
                                        setSortOrder
                                    )
                                }
                            >
                                {CounterPartyType[0]}
                            </div>
                            {/* сумма */}
                            <div
                                className={classes.waybills_list_header_summ}
                                onClick={() =>
                                    sortBySumm(
                                        waybills,
                                        setWaybills,
                                        sortOrder,
                                        setSortOrder
                                    )
                                }
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
                                        total={waybill.total}
                                        getWaybill={getWaybill}
                                        highlight={waybill.highlight}
                                        setWaybillChosen={setWaybillChosen}
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
            }
        </>
    );
}

WayBillsList.propTypes = {
    CounterPartyType: PropTypes.array.isRequired,
    path: PropTypes.string.isRequired,
    WB: PropTypes.array.isRequired,
};
