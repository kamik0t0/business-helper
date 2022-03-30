import React, { useState } from "react";
import classes from "./styles/detel-waybill.module.css";
import Loader from "../../../UI/Loader/Loader.jsx";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import { hideAnimatedModal } from "../../../UI/modal/service/handlers/modal-control.js";
import { deleteWaybill } from "./service/delete.js";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

export default function DeleteWaybill({
    setModal,
    waybill,
    setWaybills,
    url,
    noselected,
    path,
}) {
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    return (
        <>
            {waybill === undefined || waybill === null ? (
                <div className={classes.noorg}>
                    <div className={classes.noorg__text}>{noselected}</div>
                    <MyButton onClick={() => hideAnimatedModal(setModal)}>
                        Закрыть
                    </MyButton>
                </div>
            ) : (
                <div className={classes.delete}>
                    <div
                        className={classes.text}
                    >{`Вы действительно хотите удалить накладную № ${
                        waybill.id
                    } от ${waybill.waybill_date.slice(0, -14)} на ${
                        waybill.total
                    } рублей?`}</div>
                    {loader ? (
                        <Loader />
                    ) : (
                        <div className={classes.buttons}>
                            <MyButton
                                onClick={(event) =>
                                    deleteWaybill(
                                        event,
                                        setModal,
                                        waybill,
                                        setWaybills,
                                        path,
                                        url,
                                        setLoader,
                                        dispatch
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
    waybill: PropTypes.object,
    setWaybills: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    noselected: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};
