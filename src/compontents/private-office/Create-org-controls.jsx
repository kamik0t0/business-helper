import React from "react";
import classes from "./org-controls.module.css";
import MyButton from "../../utils/input/MyButton.jsx";

export default function Controls({ create, clear, setActive }) {
    return (
        <>
            <div className={classes.controls}>
                <MyButton onClick={create}>Сохранить</MyButton>
                <MyButton onClick={clear}>Очистить</MyButton>
                <MyButton
                    onClick={() => {
                        clear();
                        setActive(() => setActive(false));
                    }}
                >
                    Закрыть
                </MyButton>
            </div>
        </>
    );
}
