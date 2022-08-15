import { memo } from "react";
import classes from "./styles/my-select.module.css";

// TODO: говнокод. переписать

type SelectType = {
    defaultValue?: string;
    style?: object;
    name?: string;
    options: any[];
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onInput?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    column?: string;
    props?: [];
};

const Select: React.FC<SelectType> = memo(
    ({ style, name, options, onChange, onInput, column, ...props }) => {
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
                        {...props}
                    >
                        {options.map(
                            (
                                option: { value: string; name: string },
                                index
                            ) => {
                                if (typeof option === "object") {
                                    return (
                                        <option
                                            value={option.value}
                                            key={index}
                                        >
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
                                            <option key={index}>
                                                {option}
                                            </option>
                                        );
                                    }
                                }
                            }
                        )}
                    </select>
                </div>
            </>
        );
    }
);
export default Select;
