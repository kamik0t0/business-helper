import React from "react";
import classes from "./my-input.module.css";

const MyInput = React.forwardRef(
    ({ name, field, type, getValue, style, ...props }, ref) => {
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
                        style={style}
                        ref={ref}
                        className={
                            type === "submit"
                                ? classes.fields__item_input +
                                  " " +
                                  classes.sumbit
                                : classes.fields__item_input
                        }
                        type={`${type}`}
                        onChange={(event) => getValue(event, field)}
                        {...props}
                    />
                </div>
            </>
        );
    }
);

export default MyInput;
