import React from "react";
import classes from "./styles/buttons.module.css";
import MyButton from "../../../../UI/input/MyButton/MyButton.jsx";
import { showAnimatedModal } from "../../../../UI/modal/service/handlers/modal-control.js";

export default function Buttons({
    setModalAdd,
    setModalRead,
    setModalUpdate,
    setModalDelete,
}) {
    return (
        <>
            {" "}
            <div className={classes.buttons}>
                <MyButton onClick={() => showAnimatedModal(setModalAdd)}>
                    Добавить
                </MyButton>
                <MyButton onClick={() => showAnimatedModal(setModalRead)}>
                    Реквизиты
                </MyButton>
                <MyButton onClick={() => showAnimatedModal(setModalUpdate)}>
                    Изменить
                </MyButton>
                <MyButton onClick={() => showAnimatedModal(setModalDelete)}>
                    Удалить
                </MyButton>
            </div>
        </>
    );
}
