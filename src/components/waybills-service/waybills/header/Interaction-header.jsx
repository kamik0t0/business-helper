import { useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import MyLink from "../../../../UI/link/MyLink.jsx";
import MySelect from "../../../../UI/input/MySelect/MySelect.jsx";
import MyInput from "../../../../UI/input/MyInput/MyInput.jsx";
import classes from "../styles/waybill-list.module.css";
import { ModalContext } from "../../../../blocks/content/Main";
import { modalManager } from "../../../../UI/modal/service/handlers/modal-control";
import PropTypes from "prop-types";

const InteractionHeader = ({
    column,
    setColumn,
    filter,
    info,
    params,
    INVOICE,
}) => {
    const { setModalDelete, setModalUpdate } = useContext(ModalContext);
    const [showDeleteModal] = modalManager(setModalDelete);
    const [showUpdateModal] = modalManager(setModalUpdate);
    const { pathname } = useLocation();

    const columns = useMemo(
        () => [
            {
                value: "cl_orgname",
                name: info[1],
            },
            { value: "total", name: "Сумме" },
        ],
        [info[1]]
    );

    return (
        <div className={classes.waybills_header}>
            <MyLink path={pathname + "/createwaybill"}>
                <div className={classes.waybills_header_add}>
                    <span></span>
                </div>
            </MyLink>
            <div
                onClick={showDeleteModal}
                className={classes.waybills_header_delete}
            >
                <span></span>
            </div>
            <MyLink path={INVOICE !== null && `${pathname}/${INVOICE.id}`}>
                <div className={classes.waybills_header_redact}>
                    <div
                        onClick={INVOICE === null && showUpdateModal}
                        className={classes.waybills_header_redact_icon}
                    ></div>
                </div>
            </MyLink>

            <div className={classes.waybills_header_filter}>
                <div className={classes.waybills_header_filter_name}>
                    Поиск по:
                    <MySelect
                        defaultValue="counterparty"
                        func={setColumn}
                        column={column}
                        options={columns}
                    />
                </div>
                <MyInput
                    id="filter_input"
                    placeholder="Поиск..."
                    type="search"
                    getValue={filter}
                    defaultValue={params}
                />
            </div>
            {/* наименование раздела */}
            <div className={classes.waybills_header_name}>{info[0]}</div>
        </div>
    );
};
export default InteractionHeader;

InteractionHeader.propTypes = {
    filterColumn: PropTypes.func,
    filter: PropTypes.func.isRequired,
    info: PropTypes.array.isRequired,
    params: PropTypes.string,
};
