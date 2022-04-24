import React, { useState } from "react";
import classes from "./styles/detel-waybill.module.css";
import Loader from "../../../UI/Loader/Loader.jsx";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import { hideAnimatedModal } from "../../../UI/modal/service/handlers/modal-control.js";
import { deleteWaybill } from "./service/delete.js";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

export default function DeleteWaybill({
    setModal,
    WAYBILLTYPE,
    path,
    setWaybills,
}) {
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const WAYBILL = useSelector(
        (state) => state[`${WAYBILLTYPE[0]}`][`${WAYBILLTYPE[2]}`]
    );

    return (
        <>
            {WAYBILL === undefined || WAYBILL === null ? (
                <div className={classes.noorg}>
                    <div className={classes.noorg__text}>
                        Накладная не выбрана
                    </div>
                    <MyButton onClick={() => hideAnimatedModal(setModal)}>
                        Закрыть
                    </MyButton>
                </div>
            ) : (
                <div className={classes.delete}>
                    <div
                        className={classes.text}
                    >{`Вы действительно хотите удалить накладную № ${
                        WAYBILL.id
                    } от ${WAYBILL.waybill_date.slice(0, -14)} на ${
                        WAYBILL.total
                    } рублей?`}</div>
                    {loader ? (
                        <Loader />
                    ) : (
                        <div className={classes.buttons}>
                            <MyButton
                                onClick={(event) =>
                                    dispatch(
                                        deleteWaybill(
                                            event,
                                            setModal,
                                            WAYBILL.id,
                                            path,
                                            () => setLoader(!loader),
                                            setWaybills
                                        )
                                    )
                                }
                            >
                                Да
                            </MyButton>
                            <MyButton
                                onClick={() => hideAnimatedModal(setModal)}
                            >
                                Нет
                            </MyButton>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

DeleteWaybill.propTypes = {
    setModal: PropTypes.func.isRequired,
    WAYBILL: PropTypes.object,
    path: PropTypes.string.isRequired,
};
