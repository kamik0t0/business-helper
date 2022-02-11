import React from "react";
import classes from "./styles/org-buttons.module.css";
import MyButton from "../../../../../UI/input/MyButton/MyButton.jsx";
import { hideAnimatedModal } from "../../../../../UI/modal/service/handlers/modal-control.js";

export default function Buttons({ create, clear, setModal }) {
    return (
        <>
            <div className={classes.controls}>
                <MyButton onClick={create}>Сохранить</MyButton>
                <MyButton onClick={clear}>Очистить</MyButton>
                <MyButton onClick={() => hideAnimatedModal(setModal)}>
                    Закрыть
                </MyButton>
            </div>
        </>
    );
}
