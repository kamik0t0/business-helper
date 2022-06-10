import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./styles/delete-org.module.css";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import { deleteCounterparty } from "./service/delete.js";
import { ModalContext } from "../../../blocks/content/Main.jsx";
import { modalManager } from "../../../UI/modal/service/handlers/modal-control.js";

export default function DeleteCounterparty() {
    // анимация
    const [loader, setLoader] = useState(false);
    const COUNTERPARTY = useSelector(
        (state) => state.setCounterpartyReducer.counterparty
    );
    const dispatch = useDispatch();
    const { setModalDelete } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalDelete);
    return (
        <>
            {Object.keys(COUNTERPARTY).length === 0 ? (
                <div className={classes.noorg}>
                    <div className={classes.noorg__text}>
                        Организация не выбрана
                    </div>
                    <MyButton onClick={hideModal}>Закрыть</MyButton>
                </div>
            ) : (
                <div className={classes.delete}>
                    <div
                        className={classes.text}
                    >{`Вы действительно хотите удалить ${COUNTERPARTY.orgname}?`}</div>
                    {loader ? (
                        <Loader />
                    ) : (
                        <div className={classes.buttons}>
                            <MyButton
                                onClick={() => {
                                    dispatch(
                                        deleteCounterparty(() =>
                                            setLoader(!loader)
                                        )
                                    );
                                    hideModal();
                                }}
                            >
                                Yes
                            </MyButton>
                            <MyButton onClick={hideModal}>No</MyButton>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
