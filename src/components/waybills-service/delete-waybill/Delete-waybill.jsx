import React, { useState, useContext } from "react";
import classes from "./styles/detel-waybill.module.css";
import Loader from "../../../UI/Loader/Loader.jsx";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import { deleteWaybill } from "./service/delete.js";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { ModalContext } from "../../../blocks/content/Main.jsx";
import { modalManager } from "../../../UI/modal/service/handlers/modal-control.js";

export default function DeleteWaybill({ path }) {
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const WAYBILL = useSelector((state) => state.setWaybill.waybill);
    const { setModalDelete } = useContext(ModalContext);
    const [, hideDeleteModal] = modalManager(setModalDelete);

    return (
        <>
            {WAYBILL === undefined ||
            WAYBILL === null ||
            Object.keys(WAYBILL).length === 0 ? (
                <div className={classes.noorg}>
                    <div className={classes.noorg__text}>
                        Накладная не выбрана
                    </div>
                    <MyButton onClick={hideDeleteModal}>Закрыть</MyButton>
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
                                            setModalDelete,
                                            WAYBILL.id,
                                            path,
                                            () => setLoader(!loader)
                                        )
                                    )
                                }
                            >
                                Да
                            </MyButton>
                            <MyButton onClick={hideDeleteModal}>Нет</MyButton>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

DeleteWaybill.propTypes = {
    path: PropTypes.string.isRequired,
};
