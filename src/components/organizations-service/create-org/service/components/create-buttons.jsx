import React, { useContext } from "react";
import classes from "./styles/org-buttons.module.css";
import MyButton from "../../../../../UI/input/MyButton/MyButton.jsx";
import { ModalContext } from "../../../../../blocks/content/Main.jsx";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control.js";
import PropTypes from "prop-types";

export default function Buttons({ create, clear }) {
    const { setModalAdd } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalAdd);
    return (
        <>
            <div className={classes.controls}>
                <MyButton onClick={create}>Сохранить</MyButton>
                <MyButton onClick={clear}>Очистить</MyButton>
                <MyButton onClick={hideModal}>Закрыть</MyButton>
            </div>
        </>
    );
}

Buttons.propTypes = {
    create: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
};
