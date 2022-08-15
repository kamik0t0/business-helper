import { FC, useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { ModalContext } from "../../../../blocks/content/Main";
import {
    useTypedDispatch,
    useTypedSelector,
} from "../../../../redux/hooks/hooks";
import { setCounterparty } from "../../../../redux/reducers/counterpartiesSlice";
import Select from "../../../../UI/input/Select/Select";
import TextField from "../../../../UI/input/TextField/TextField";
import Link from "../../../../UI/Link/Link";
import { modalManager } from "../../../../UI/modal/service/handlers/modal-control";
import classes from "../styles/waybill-list.module.css";
import { useCreateInvoice } from "../waybill/hooks/useCreateInvoice";
import { filterColumns } from "./utils/filterColumns";

type InteractionHeaderType = {
    column: string;
    setColumn: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    filter: (...args: any) => void;
    info: string[];
    params: string;
};

const InteractionHeader: FC<InteractionHeaderType> = ({
    column,
    setColumn,
    filter,
    info,
    params,
}) => {
    const dispatch = useTypedDispatch();
    const { Invoice } = useTypedSelector((state) => state.invoicesReducer);
    const { setModalDelete, setModalUpdate } = useContext(ModalContext)!;
    const [showDeleteModal] = modalManager(setModalDelete);
    const [showUpdateModal] = modalManager(setModalUpdate);
    const { pathname } = useLocation();
    const createNewInvoice = useCreateInvoice();

    const columns = useMemo(() => filterColumns(info[1]), [info]);
    const isInvoiceChoosen = () =>
        Invoice === null ? showUpdateModal() : dispatch(setCounterparty(null));
    const updateLink = `${pathname}/${Invoice?.id}`;

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
            <>
                {Invoice !== null ? (
                    <Link path={updateLink}>
                        <div className={classes.waybills_header_redact}>
                            <div
                                onClick={isInvoiceChoosen}
                                className={classes.waybills_header_redact_icon}
                            ></div>
                        </div>
                    </Link>
                ) : (
                    <div className={classes.waybills_header_redact}>
                        <div
                            onClick={isInvoiceChoosen}
                            className={classes.waybills_header_redact_icon}
                        ></div>
                    </div>
                )}
            </>

            <div className={classes.waybills_header_filter}>
                <div className={classes.waybills_header_filter_name}>
                    Поиск по:
                    <Select
                        defaultValue="counterparty"
                        onChange={setColumn}
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
