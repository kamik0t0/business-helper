import { memo } from "react";
import classes from "./styles/my-button.module.css";

type ButtonType = {
    children: string;
    onClick?: any;
    style?: object;
    props?: [];
};

const Button: React.FC<ButtonType> = memo(
    ({ children, style, onClick, ...props }) => {
        return (
            <button
                style={style}
                className={classes.button}
                onClick={onClick}
                {...props}
            >
                {children}
            </button>
        );
    }
);

export default Button;
