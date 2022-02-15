import React from "react";
import classes from "./styles/buttons.module.css";
import MyButton from "../../../../UI/input/MyButton/MyButton.jsx";
import { showAnimatedModal } from "../../../../UI/modal/service/handlers/modal-control.js";
import PropTypes from "prop-types";

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
                    Показать
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

Buttons.propTypes = {
    setModalAdd: PropTypes.func.isRequired,
    setModalRead: PropTypes.func.isRequired,
    setModalUpdate: PropTypes.func.isRequired,
    setModalDelete: PropTypes.func.isRequired,
};
