import React, { useState, useRef } from "react";
import classes from "./my-input.module.css";

const MyInput = React.forwardRef(
    (
        {
            name,
            field,
            prevValue,
            type,
            getValue,
            style,
            length,
            isNumber,
            ...props
        },
        ref
    ) => {
        const [error, setError] = useState(false);
        // Валидация ввода числовых значений
        function check() {
            let input = document.getElementById(field + prevValue);
            if (!isNumber) return;
            input.value = input.value.replace(/[^0-9]/g, "");
            if (input.value.length === length) {
                setError(false);
            } else {
                setError(true);
            }
        }
        return (
            <>
                <div className={classes.fields__item}>
                    {/* Если параметр name не передан, то название поля не показывается */}
                    {name !== undefined && (
                        <div
                            // style={style}
                            className={classes.fields__item_name}
                        >
                            {name}
                        </div>
                    )}

                    <input
                        id={field + prevValue}
                        maxLength={length}
                        minLength={length}
                        style={style}
                        ref={ref}
                        className={
                            type === "submit"
                                ? classes.fields__item_input +
                                  " " +
                                  classes.sumbit
                                : error && isNumber
                                ? classes.fields__item_input +
                                  " " +
                                  classes.error
                                : classes.fields__item_input
                        }
                        type={`${type}`}
                        onInput={check}
                        onChange={(event) => getValue(event, field, length)}
                        {...props}
                    />
                </div>
            </>
        );
    }
);

export default MyInput;
