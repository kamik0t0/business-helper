import React, { memo } from "react";
import classes from "./styles/my-input.module.css";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

type TextFieldType = {
    id?: string;
    type?: string;
    style?: object;
    length?: number;
    isNumber?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
    defaultValue?: string | null | undefined | number | boolean;
    focus?: boolean;
    error?: boolean;
    placeholder?: string;
    value?: string;
};

const TextField: React.FC<TextFieldType> = memo(
    React.forwardRef<HTMLInputElement, TextFieldType>(
        (
            {
                id,
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
                value,
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
                            id={id}
                            autoFocus={focus}
                            ref={ref}
                            className={inputClassName}
                            type={type}
                            maxLength={length}
                            minLength={length}
                            defaultValue={defaultValue as string}
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

// Legacy
TextField.propTypes = {
    id: PropTypes.string.isRequired,
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
