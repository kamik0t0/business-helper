import React, { useState } from "react";
import classes from "./styles/my-input.module.css";
import { check } from "./service/preventStrInput";
import PropTypes, { func } from "prop-types";

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
        return (
            <>
                <div className={classes.fields__item}>
                    {/* Если параметр name не передан, то название поля не показывается */}
                    {name !== undefined && (
                        <div className={classes.fields__item_name}>{name}</div>
                    )}

                    <input
                        id={field + prevValue + ""}
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
                        onInput={() =>
                            check(isNumber, field, prevValue, setError, length)
                        }
                        onChange={(event) => getValue(event, field, length)}
                        {...props}
                    />
                </div>
            </>
        );
    }
);

export default MyInput;

MyInput.propTypes = {
    name: PropTypes.string,
    field: PropTypes.string,
    prevValue: PropTypes.object,
    type: PropTypes.string,
    getValue: PropTypes.func,
    style: PropTypes.object,
    length: PropTypes.number,
    isNumber: PropTypes.bool,
};