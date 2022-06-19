import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MySelect from "../../../../UI/input/MySelect/MySelect.jsx";
import MyInput from "../../../../UI/input/MyInput/MyInput.jsx";
import classes from "../styles/waybill-list.module.css";
import { useSelector } from "react-redux";
import { ModalContext } from "../../../../blocks/content/Main";
import { modalManager } from "../../../../UI/modal/service/handlers/modal-control";
import PropTypes from "prop-types";

const InteractionHeader = ({
    highlightOffArgs,
    filterColumn,
    filter,
    info,
}) => {
    const { setModalDelete } = useContext(ModalContext);
    const [showDeleteModal] = modalManager(setModalDelete);
    const WAYBILL = useSelector((state) => state.setWaybill.waybill);
    const { pathname } = window.location;

    return (
        <div className={classes.waybills_header}>
            <Link to={pathname + "/createwaybill"}>
                <div
                    onClick={highlightOffArgs}
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
            <Link to={Object.keys(WAYBILL).length > 0 && "updatewaybill"}>
                <div
                    onClick={highlightOffArgs}
                    className={classes.waybills_header_redact}
                >
                    <div className={classes.waybills_header_redact_icon}></div>
                </div>
            </Link>

            <div className={classes.waybills_header_filter}>
                <div className={classes.waybills_header_filter_name}>
                    Поиск по:
                    <MySelect
                        defaultValue="counterparty"
                        func={filterColumn}
                        options={[
                            {
                                value: "cl_orgname",
                                name: info[1],
                            },
                            { value: "total", name: "Сумме" },
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
            <div className={classes.waybills_header_name}>{info[0]}</div>
        </div>
    );
};

export default InteractionHeader;

InteractionHeader.propTypes = {
    highlightOffArgs: PropTypes.func.isRequired,
    filterColumn: PropTypes.func.isRequired,
    filter: PropTypes.func.isRequired,
    info: PropTypes.array.isRequired,
};
