// компонент показывающий список существующих накладных
import { useRef, useContext, useEffect } from "react";
import { useLocation } from "react-router";
import classes from "./styles/waybill-list.module.css";
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
import WaybillsWrapper from "./waybills-wrapper.jsx";
import { useParams } from "react-router-dom";

export default function WayBillsList({ CounterpartyInfo, WAYBILLS }) {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const { orgId } = useParams();
    console.log(orgId);
    let row = useRef(null);
    const type = pathname === "/sales" ? "SALES" : "PURCHASES";

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

    const getWaybill = (event, number) =>
        dispatch(setWaybillAction(waybills[number]));

    const setHighlightOff = () =>
        setWaybills(highlightOff([...waybills], WAYBILL, showUpdateModal));

    const highlightON = (index) =>
        setWaybills(() => highlight(index, waybills, row));

    return (
        <>
            {
                <>
                    <div className={classes.content}>
                        <InteractionHeader
                            highlightOffArgs={setHighlightOff}
                            filterColumn={filterColumn}
                            filter={filter}
                            info={[CounterpartyInfo[1], CounterpartyInfo[2]]}
                        />

                        <WaybillHeader sort={sort} info={CounterpartyInfo[0]} />
                        <WaybillsWrapper
                            waybills={waybills}
                            getWaybill={getWaybill}
                            highlightON={highlightON}
                        />
                    </div>
                    {modalDelete.show && (
                        <Modal
                            size={{ height: "25vh", width: "40vw" }}
                            active={modalDelete.add}
                            setModal={setModalDelete}
                        >
                            <DeleteWaybill />
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
    WAYBILLS: PropTypes.array.isRequired,
};
