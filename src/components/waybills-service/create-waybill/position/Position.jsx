// строка в создаваемой накладной (позиция)
import React from "react";
import classes from "./styles/position.module.css";
import MyInput from "../../../../UI/input/MyInput/MyInput.jsx";
import PropTypes from "prop-types";

export default function Position({
    item,
    highlight,
    getRow,
    number,
    getNomenclature,
    getQuantity,
    getPrice,
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
                        defaultValue={"" || item.nomenclature}
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
                        defaultValue={+item.quantity || ""}
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
                        defaultValue={+item.price || ""}
                        getValue={(event) => getPrice(event, number)}
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
    getRow: PropTypes.func.isRequired,
    number: PropTypes.number.isRequired,
    getNomenclature: PropTypes.func.isRequired,
    getQuantity: PropTypes.func.isRequired,
    getPrice: PropTypes.func.isRequired,
};
