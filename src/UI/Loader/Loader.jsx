import classes from "./styles/loader.module.css";
import PropTypes from "prop-types";

// аниминрованный круг
export default function Loader({ style }) {
    return (
        <>
            <div style={style} className={classes.loader}></div>
        </>
    );
}

Loader.propTypes = {
    syle: PropTypes.object,
};
