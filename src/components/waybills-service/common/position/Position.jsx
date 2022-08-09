import classNames from "classnames/bind";
import PropTypes from "prop-types";
import TextField from "../../../../UI/input/TextField/TextField";
import { toRU } from "../../../../utils/currencyFormat";
import { usePosition } from "./hooks/usePositon";
import classes from "./styles/position.module.css";

const inputStyle = {
    display: "flex",
    flex: "1 1 100%",
    width: "100%",
};

export default function Position({ position, positionIndex }) {
    const PositionAPI = usePosition(position, positionIndex);

    const summ = toRU.format(position.summ);
    const VAT = toRU.format(position.nds);
    const total = toRU.format(position.total);

    const cx = classNames.bind(classes);
    const isHighlight = cx({
        [classes.position]: true,
        [classes.highlight]: position.highlight,
    });

    return (
        <>
            <div onClick={PositionAPI.selectPosition} className={isHighlight}>
                <div className={classes.position_number}>
                    {positionIndex + 1}
                </div>
                <div className={classes.position_nomenclature}>
                    <TextField
                        style={inputStyle}
                        defaultValue={"" || position.nomenclature}
                        onChange={PositionAPI.getNomenclature}
                        type="text"
                    />
                </div>
                <div className={classes.position_quantity}>
                    <TextField
                        style={inputStyle}
                        defaultValue={+position.quantity || ""}
                        onChange={PositionAPI.getQuantity}
                        type="number"
                    />
                </div>
                <div className={classes.position_price}>
                    <TextField
                        style={inputStyle}
                        defaultValue={+position.price || ""}
                        onChange={PositionAPI.getPrice}
                        type="number"
                    />
                </div>
                <div className={classes.position_summ}>{summ}</div>
                <div className={classes.position_NDSprcnt}>
                    {position.nds_percent * 100}
                </div>
                <div className={classes.position_NDS}>{VAT}</div>
                <div className={classes.position_total}>{total}</div>
            </div>
        </>
    );
}

Position.propTypes = {
    positionIndex: PropTypes.number.isRequired,
    position: PropTypes.object.isRequired,
};
