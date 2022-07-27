import React, { memo } from "react";
import classes from "./styles/my-input.module.css";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

const RequisiteInput = memo(
    React.forwardRef(
        (
            {
                length,
                isNumber,
                defaultValue,
                getInputValue,
                error,
                isInputError,
            },
            ref
        ) => {
            const cx = classNames.bind(classes);
            const inputClassName = cx({
                [classes.fields__item_input]: true,
                [classes.error]: error && isNumber,
            });

            return (
                <input
                    ref={ref}
                    className={inputClassName}
                    type="text"
                    maxLength={length}
                    minLength={length}
                    defaultValue={defaultValue}
                    onInput={isInputError}
                    onChange={getInputValue}
                />
            );
        }
    )
);

export default RequisiteInput;

RequisiteInput.propTypes = {
    length: PropTypes.number,
    isNumber: PropTypes.bool,
    defaultValue: PropTypes.string,
};
