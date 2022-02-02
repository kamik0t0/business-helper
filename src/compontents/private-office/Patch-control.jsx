import React, { useState, useEffect, useRef } from "react";
import classes from "./patch-control.module.css";
import MyInput from "../../utils/input/MyInput.jsx";
import MyButton from "../../utils/input/MyButton.jsx";

export default function PatchControl({ obj, number, getValue, setValue }) {
    const [refresh, setRefresh] = useState(false);
    // ref для чтения значения текущего значения и подставноки в input
    let prevValue = useRef();
    // ref для чтения нового значения из input
    let value = useRef();

    useEffect(() => {
        // переключение фокуса на динамически созданный элемент
        let target = document.getElementById(number);
        // обработчик для переключения на input
        target.addEventListener("click", () => {
            setRefresh(!refresh);
        });
        // фокусировка на появляющемся input
        let observer = new MutationObserver((mutations) => {
            try {
                mutations[2].addedNodes[0].lastChild.focus();
            } catch (error) {
                console.log("no focus");
            }
        });
        observer.observe(target, {
            childList: true,
            subtree: true,
        });
    }, []);

    return (
        <div id={number} className={classes.content}>
            {refresh ? (
                <div className={classes.redactable}>
                    <MyInput
                        ref={value}
                        name={obj.name}
                        type="text"
                        getValue={getValue}
                        defaultValue={
                            prevValue.current === null
                                ? null
                                : prevValue.current.innerHTML
                        }
                    />
                    <div className={classes.buttons}>
                        <MyButton
                            onClick={(event) => {
                                setValue(event, obj.field, value.current.value);
                                setRefresh(!refresh);
                            }}
                            style={{
                                width: "50px",
                            }}
                        >
                            Ок
                        </MyButton>
                        <MyButton onClick={() => setRefresh(!refresh)}>
                            Отмена
                        </MyButton>
                    </div>
                </div>
            ) : (
                <>
                    <div className={classes.requisit_name}>{obj.name}</div>
                    <div ref={prevValue} className={classes.requisit_value}>
                        {/* отображение дефолтного или измененного значения */}
                        {value.current ? value.current.value : obj.value}
                    </div>
                </>
            )}
        </div>
    );
}
