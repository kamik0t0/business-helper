import React, { memo } from "react";
import classes from "./styles/my-input.module.css";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

const TextField = memo(
    React.forwardRef(
        (
            {
                type,
                focus,
                style,
                length,
                isNumber,
                defaultValue,
                error,
                onInput,
                onChange,
                onClick,
                onBlur,
                onFocus,
                ...props
            },
            ref
        ) => {
            const cx = classNames.bind(classes);
            const inputClassName = cx({
                [classes.fields__item_input]: true,
                [classes.sumbit]: type === "submit",
                [classes.error]: error && isNumber,
            });

            return (
                <>
                    <div className={classes.fields__item}>
                        <input
                            autoFocus={focus}
                            ref={ref}
                            className={inputClassName}
                            type={type}
                            maxLength={length}
                            minLength={length}
                            defaultValue={defaultValue}
                            style={style}
                            onInput={onInput}
                            onChange={onChange}
                            onClick={onClick}
                            onBlur={onBlur}
                            onFocus={onFocus}
                            {...props}
                        />
                    </div>
                </>
            );
        }
    )
);
export default TextField;

TextField.propTypes = {
    type: PropTypes.string,
    style: PropTypes.object,
    length: PropTypes.number,
    isNumber: PropTypes.bool,
    onChange: PropTypes.func,
    onInput: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    defaultValue: PropTypes.string,
    focus: PropTypes.bool,
    error: PropTypes.bool,
};
