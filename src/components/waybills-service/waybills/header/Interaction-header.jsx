import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import MySelect from "../../../../UI/input/MySelect/MySelect.jsx";
import MyInput from "../../../../UI/input/MyInput/MyInput.jsx";
import classes from "../styles/waybill-list.module.css";
import { ModalContext } from "../../../../blocks/content/Main";
import { modalManager } from "../../../../UI/modal/service/handlers/modal-control";
import { useTypedSelector } from "../../../../redux/hooks/hooks";
import PropTypes from "prop-types";

const InteractionHeader = ({ setColumn, filter, info, params }) => {
    const { setModalDelete } = useContext(ModalContext);
    const [showDeleteModal] = modalManager(setModalDelete);
    const { pathname } = useLocation();
    const INVOICE = useTypedSelector((state) => state.invoicesReducer.Invoice);

    return (
        <div className={classes.waybills_header}>
            <Link to={pathname + "/createwaybill"}>
                <div className={classes.waybills_header_add}>
                    <span></span>
                </div>
            </Link>
            <div
                onClick={showDeleteModal}
                className={classes.waybills_header_delete}
            >
                <span></span>
            </div>
            <Link to={INVOICE !== null && `${pathname}/${INVOICE.id}`}>
                <div className={classes.waybills_header_redact}>
                    <div className={classes.waybills_header_redact_icon}></div>
                </div>
            </Link>

            <div className={classes.waybills_header_filter}>
                <div className={classes.waybills_header_filter_name}>
                    Поиск по:
                    <MySelect
                        defaultValue="counterparty"
                        func={setColumn}
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
                    type="search"
                    getValue={filter}
                    defaultValue={`${params}`}
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
