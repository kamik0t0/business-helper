import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { ModalContext } from "../../../../blocks/content/Main";
import { useTypedSelector } from "../../../../redux/hooks/hooks";
import TextField from "../../../../UI/input/TextField/TextField";
import Select from "../../../../UI/input/Select/Select";
import Link from "../../../../UI/Link/Link.jsx";
import { modalManager } from "../../../../UI/modal/service/handlers/modal-control";
import classes from "../styles/waybill-list.module.css";
import { useInvoice } from "../waybill/hooks/useInvoice";
import { filterColumns } from "./utils/filterColumns";

const InteractionHeader = ({ column, setColumn, filter, info, params }) => {
    const { Invoice } = useTypedSelector((state) => state.invoicesReducer);
    const { setModalDelete, setModalUpdate } = useContext(ModalContext);
    const [showDeleteModal] = modalManager(setModalDelete);
    const [showUpdateModal] = modalManager(setModalUpdate);
    const { pathname } = useLocation();
    const [_, createNewInvoice] = useInvoice();

    const columns = useMemo(() => filterColumns(info[1]), [info]);

    return (
        <div className={classes.waybills_header}>
            <Link path={pathname + "/createwaybill"}>
                <div
                    onClick={createNewInvoice}
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
            <Link path={Invoice !== null && `${pathname}/${Invoice.id}`}>
                <div className={classes.waybills_header_redact}>
                    <div
                        onClick={Invoice === null && showUpdateModal}
                        className={classes.waybills_header_redact_icon}
                    ></div>
                </div>
            </Link>

            <div className={classes.waybills_header_filter}>
                <div className={classes.waybills_header_filter_name}>
                    Поиск по:
                    <Select
                        defaultValue="counterparty"
                        func={setColumn}
                        column={column}
                        options={columns}
                    />
                </div>
                <TextField
                    id="filter_input"
                    placeholder="Поиск..."
                    onChange={filter}
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
    column: PropTypes.string.isRequired,
    setColumn: PropTypes.func.isRequired,
    filter: PropTypes.func.isRequired,
    info: PropTypes.array.isRequired,
    params: PropTypes.string,
};
