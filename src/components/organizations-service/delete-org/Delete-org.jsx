import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./styles/delete-org.module.css";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import { deleteOrg } from "./service/delete.js";
import { ModalContext } from "../../../blocks/content/Main.jsx";
import { modalManager } from "../../../UI/modal/service/handlers/modal-control.js";

export default function DeleteOrg() {
    // анимация
    const [loader, setLoader] = useState(false);
    const MYORG = useSelector((state) => state.setMyOrgReducer.myOrg);
    const dispatch = useDispatch();
    const { setModalDelete } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalDelete);
    return (
        <>
            {Object.keys(MYORG).length === 0 ? (
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
                    >{`Вы действительно хотите удалить ${MYORG.orgname}?`}</div>
                    {loader ? (
                        <Loader />
                    ) : (
                        <div className={classes.buttons}>
                            <MyButton
                                onClick={() => {
                                    dispatch(
                                        deleteOrg(() => setLoader(!loader))
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
