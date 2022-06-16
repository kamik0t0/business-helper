// компонент показывающий список существующих накладных
import { useRef, useContext, useEffect } from "react";
import { v4 as uuid } from "uuid";
import classes from "./styles/waybill-list.module.css";
import Waybill from "./waybill/Waybill.jsx";
import { highlight } from "../../../utils/highlight.js";
import Modal from "../../../UI/modal/modal.jsx";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import PropTypes from "prop-types";
import DeleteWaybill from "../delete-waybill/Delete-waybill.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setWaybillAction } from "../../../redux/waybill-reducer.js";
import { ModalContext } from "../../../blocks/content/Main.jsx";
import { modalManager } from "../../../UI/modal/service/handlers/modal-control.js";
import WaybillHeader from "./header/Waybill-header.jsx";
import { useSort } from "./service/hooks/useSort";
import { useFilterColumn } from "./service/hooks/useFilterColumn";
import { useFilter } from "./service/hooks/useFilter";
import { highlightOff } from "./service/scripts/highlightOff.js";
import InteractionHeader from "./header/Interaction-header.jsx";

export default function WayBillsList({ CounterpartyInfo, path, WAYBILLS }) {
    const dispatch = useDispatch();
    let row = useRef(null);
    const type = path.slice(0, -14) === "/sales" ? "SALES" : "PURCHASES";

    const WAYBILL = useSelector((state) => state.setWaybill.waybill);

    const [column, filterColumn] = useFilterColumn("cl_orgname");
    const [waybills, setWaybills, filter] = useFilter(column, WAYBILLS);
    const sort = useSort(type, [...waybills]);

    const { modalDelete, modalUpdate, setModalDelete, setModalUpdate } =
        useContext(ModalContext);

    const [showUpdateModal, hideUpdateModal] = modalManager(setModalUpdate);

    useEffect(() => {
        setWaybills(WAYBILLS);
    }, [WAYBILLS]);

    const getWaybill = (event, number) => {
        dispatch(setWaybillAction(waybills[number]));
    };

    const highlightOffArgs = () =>
        setWaybills(highlightOff([...waybills], WAYBILL, showUpdateModal));

    const highlightON = (index) =>
        setWaybills(highlight(index, [...waybills], row));

    return (
        <>
            {
                <>
                    <div className={classes.content}>
                        <InteractionHeader
                            highlightOffArgs={highlightOffArgs}
                            filterColumn={filterColumn}
                            filter={filter}
                            info={[CounterpartyInfo[1], CounterpartyInfo[1]]}
                            path={path}
                        />

                        <WaybillHeader sort={sort} info={CounterpartyInfo[0]} />

                        {waybills.length > 0 &&
                            waybills.map((waybill, index) => {
                                return (
                                    <Waybill
                                        key={uuid()}
                                        index={index}
                                        waybill={waybill}
                                        getWaybill={getWaybill}
                                        highlightON={highlightON}
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
                            <DeleteWaybill path={path} />
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
