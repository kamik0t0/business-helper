import React, { useEffect } from "react";
import classes from "./error.module.css";
import { useDispatch, useSelector } from "react-redux";

export default function Error() {
    const isError = useSelector((state) => state.errorReducer.isError);
    const dispatch = useDispatch();

    useEffect(() => {
        // минимальные спецэффекты
        let error = document.getElementById("error");
        setTimeout(() => {
            error.style.opacity = 1;
        }, 0);
        setTimeout(() => {
            error.style.opacity = 0.6;
        }, 4000);
        setTimeout(() => {
            // убираем компонент
            dispatch({ type: "isERROR_FALSE", payload: false });
        }, 6000);
    }, []);

    return (
        <>
            {isError && (
                <div id="error" className={classes.error}>
                    Нет соединения с сервером
                </div>
            )}
        </>
    );
}