import { memo } from "react";
import classes from "./styles/my-select.module.css";

const Select = memo(
    ({
        styleFieldName,
        style,
        name,
        options,
        onChange,
        onInput,
        column,
        ...props
    }) => {
        return (
            <>
                <div className={classes.fields__item}>
                    {/* Если параметр name не передан, то название поля не показывается */}
                    {name !== undefined && (
                        <div
                            style={style}
                            className={classes.fields__item_name}
                        >
                            {name}
                        </div>
                    )}
                    <select
                        onChange={onChange}
                        onInput={onInput}
                        className={classes.fields__item_input}
                        style={styleFieldName}
                        {...props}
                    >
                        {options.map((option, index) => {
                            if (typeof option === "object") {
                                return (
                                    <option value={option.value} key={index}>
                                        {option.name}
                                    </option>
                                );
                            } else {
                                if (index === 0) {
                                    return (
                                        <option key={index} disabled>
                                            {option}
                                        </option>
                                    );
                                } else {
                                    return (
                                        <option key={index}>{option}</option>
                                    );
                                }
                            }
                        })}
                    </select>
                </div>
            </>
        );
    }
);
export default Select;
