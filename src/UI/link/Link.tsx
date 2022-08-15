import React, { memo, ReactNode } from "react";
import { Link } from "react-router-dom";
import classes from "./styles/my-link.module.css";

interface ICustomLink {
    children: string | ReactNode;
    path: string;
    style?: object;
}
const isEqual = (prev: ICustomLink, next: ICustomLink) => {
    if (prev.path === next.path) return true;
    return false;
};

const CustomLink: React.FC<ICustomLink> = memo(({ children, path, style }) => {
    return (
        <>
            <Link style={style} to={path} className={classes.link}>
                {children}
            </Link>
        </>
    );
}, isEqual);

export default CustomLink;
