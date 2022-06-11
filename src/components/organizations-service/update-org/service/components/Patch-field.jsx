import React, { useState, useEffect, useRef } from "react";
import classes from "./styles/patch-fields.module.css";
import MyButton from "../../../../../UI/input/MyButton/MyButton.jsx";
import MyInput from "../../../../../UI/input/MyInput/MyInput.jsx";
import { setFocus } from "../handlers/set-focus.js";
import PropTypes from "prop-types";

export default function PatchField({ requisite, number, getValue, setValue }) {
    const [refresh, setRefresh] = useState(false);
    // ref для чтения значения текущего значения и подстановки в input
    let prevValue = useRef();
    // ref для чтения нового значения из input
    let value = useRef();
    let oldValue;

    try {
        oldValue = prevValue.current.innerHTML;
    } catch (error) {
        console.log(error);
    }

    useEffect(() => {
        // переключение фокуса на созданный input
        setFocus(number, refresh, setRefresh);
    }, []);

    return (
        <div id={number} className={classes.content}>
            {refresh ? (
                <div className={classes.redactable}>
                    <MyInput
                        ref={value}
                        prevValue={prevValue.current}
                        field={requisite.field}
                        name={requisite.name}
                        type="text"
                        length={requisite.lngth}
                        isNumber={requisite.num}
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
                                setValue(
                                    event,
                                    requisite.field,
                                    value.current.value
                                ) && setRefresh(!refresh);
                            }}
                            style={{
                                width: "50px",
                            }}
                        >
                            Ок
                        </MyButton>
                        <MyButton
                            onClick={() => {
                                value.current.value = oldValue;
                                setRefresh(!refresh);
                            }}
                        >
                            Отмена
                        </MyButton>
                    </div>
                </div>
            ) : (
                <>
                    <div className={classes.requisit_name}>
                        {requisite.name}
                    </div>
                    <div ref={prevValue} className={classes.requisit_value}>
                        {/* отображение дефолтного или измененного значения */}
                        {value.current ? value.current.value : requisite.value}
                    </div>
                </>
            )}
        </div>
    );
}

PatchField.propTypes = {
    requisite: PropTypes.object.isRequired,
    number: PropTypes.number.isRequired,
    getValue: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
};
