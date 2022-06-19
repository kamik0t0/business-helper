// строка в создаваемой накладной (позиция)
import React from "react";
import classes from "./styles/position.module.css";
import classNames from "classnames/bind";
import MyInput from "../../../../UI/input/MyInput/MyInput.jsx";
import PropTypes from "prop-types";

export default function Position({
    item,
    highlight,
    highlightPosition,
    number,
    getPositionValues,
}) {
    const cx = classNames.bind(classes);
    const isHighlight = cx({
        [classes.position]: true,
        [classes.highlight]: highlight,
    });

    const inputStyle = {
        display: "flex",
        flex: "1 1 100%",
        width: "100%",
    };

    const getNomenclature = (event) =>
        getPositionValues(event, number, "nomenclature");
    const getQuantity = (event) => getPositionValues(event, number, "quantity");
    const getPrice = (event) => getPositionValues(event, number, "price");

    return (
        <>
            <div
                onClick={(event) => highlightPosition(event, number)}
                className={isHighlight}
            >
                <div className={classes.position_number}>{number + 1}</div>
                <div className={classes.position_nomenclature}>
                    <MyInput
                        style={inputStyle}
                        defaultValue={"" || item.nomenclature}
                        getValue={getNomenclature}
                        type="text"
                    />
                </div>
                <div className={classes.position_quantity}>
                    <MyInput
                        style={inputStyle}
                        defaultValue={+item.quantity || ""}
                        getValue={getQuantity}
                        type="number"
                    />
                </div>
                <div className={classes.position_price}>
                    <MyInput
                        style={inputStyle}
                        defaultValue={+item.price || ""}
                        getValue={getPrice}
                        type="number"
                    />
                </div>
                <div className={classes.position_summ}>
                    {item.getSumm().toFixed(2)}
                </div>
                <div className={classes.position_NDSprcnt}>{20}</div>
                <div className={classes.position_NDS}>
                    {item.getNDS().toFixed(2)}
                </div>
                <div className={classes.position_total}>
                    {item.getTotal().toFixed(2)}
                </div>
            </div>
        </>
    );
}

Position.propTypes = {
    item: PropTypes.object.isRequired,
    highlight: PropTypes.bool.isRequired,
    highlightPosition: PropTypes.func.isRequired,
    number: PropTypes.number.isRequired,
    getPositionValues: PropTypes.func.isRequired,
};
