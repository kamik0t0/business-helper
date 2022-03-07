// строка в создаваемой накладной (позиция)
import React from "react";
import classes from "./styles/position.module.css";
import MyInput from "../../../../UI/input/MyInput/MyInput.jsx";
import PropTypes from "prop-types";

export default function Position({
    highlight,
    getRow,
    number,
    getSumm,
    getNDS,
    getTotal,
    getNomenclature,
    getQuantity,
    getPrice,
    nomenclature,
    quantity,
    price,
}) {
    return (
        <>
            <div
                onClick={(event) => getRow(event, number)}
                className={
                    highlight === false
                        ? classes.position
                        : classes.position + " " + classes.highlight
                }
            >
                <div className={classes.position_number}>{number + 1}</div>
                <div className={classes.position_nomenclature}>
                    <MyInput
                        style={{
                            display: "flex",
                            flex: "1 1 100%",
                            width: "100%",
                        }}
                        defaultValue={"" || nomenclature}
                        getValue={(event) => getNomenclature(event, number)}
                        type="text"
                    />
                </div>
                <div className={classes.position_quantity}>
                    <MyInput
                        style={{
                            display: "flex",
                            flex: "1 1 100%",
                            width: "100%",
                        }}
                        defaultValue={quantity || ""}
                        getValue={(event) => getQuantity(event, number)}
                        type="number"
                    />
                </div>
                <div className={classes.position_price}>
                    <MyInput
                        style={{
                            display: "flex",
                            flex: "1 1 100%",
                            width: "100%",
                        }}
                        defaultValue={price || ""}
                        getValue={(event) => getPrice(event, number)}
                        type="number"
                    />
                </div>
                <div className={classes.position_summ}>
                    {getSumm().toFixed(2)}
                </div>
                <div className={classes.position_NDSprcnt}>{20}</div>
                <div className={classes.position_NDS}>
                    {getNDS().toFixed(2)}
                </div>
                <div className={classes.position_total}>
                    {getTotal().toFixed(2)}
                </div>
            </div>
        </>
    );
}

Position.propTypes = {
    highlight: PropTypes.bool.isRequired,
    getRow: PropTypes.func.isRequired,
    number: PropTypes.number.isRequired,
    getSumm: PropTypes.func.isRequired,
    getNDS: PropTypes.func.isRequired,
    getNomenclature: PropTypes.func.isRequired,
    getQuantity: PropTypes.func.isRequired,
    getPrice: PropTypes.func.isRequired,
    nomenclature: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
};
