import classes from "./styles/position.module.css";
import classNames from "classnames/bind";
import MyInput from "../../../../UI/input/MyInput/MyInput.jsx";
import PropTypes from "prop-types";
import { usePosition } from "./hooks/usePositon";
import { toRU } from "../../../../utils/currencyFormat";

const inputStyle = {
    display: "flex",
    flex: "1 1 100%",
    width: "100%",
};

export default function Position({
    position,
    positionIndex,
    setPositions,
    positions,
}) {
    const PositionAPI = usePosition(
        position,
        positionIndex,
        setPositions,
        positions
    );

    const summ = position.getSumm();
    const VAT = position.getNDS();
    const total = position.getTotal();

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
                    <MyInput
                        style={inputStyle}
                        defaultValue={"" || position.nomenclature}
                        getValue={PositionAPI.getNomenclature}
                        type="text"
                    />
                </div>
                <div className={classes.position_quantity}>
                    <MyInput
                        style={inputStyle}
                        defaultValue={+position.quantity || ""}
                        getValue={PositionAPI.getQuantity}
                        type="number"
                    />
                </div>
                <div className={classes.position_price}>
                    <MyInput
                        style={inputStyle}
                        defaultValue={+position.price || ""}
                        getValue={PositionAPI.getPrice}
                        type="number"
                    />
                </div>
                <div className={classes.position_summ}>{toRU.format(summ)}</div>
                <div className={classes.position_NDSprcnt}>
                    {position.nds_percent * 100}
                </div>
                <div className={classes.position_NDS}>{toRU.format(VAT)}</div>
                <div className={classes.position_total}>
                    {toRU.format(total)}
                </div>
            </div>
        </>
    );
}

Position.propTypes = {
    positionIndex: PropTypes.number.isRequired,
    position: PropTypes.object.isRequired,
    positions: PropTypes.array.isRequired,
};
