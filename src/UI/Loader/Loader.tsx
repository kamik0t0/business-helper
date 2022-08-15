import classes from "./styles/loader.module.css";
import PropTypes from "prop-types";

type ILoader = {
    style?: object;
};

// аниминрованный круг
const Loader: React.FC<ILoader> = ({ style }) => {
    return (
        <>
            <div style={style} className={classes.loader}></div>
        </>
    );
};

Loader.propTypes = {
    style: PropTypes.object,
};

export default Loader;
