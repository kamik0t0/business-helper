// строка в создаваемой накладной (позиция)
import React from "react";
import classes from "./styles/position.module.css";
import MyInput from "../../../../UI/input/MyInput/MyInput.jsx";

export default function Position({
    highlight,
    getDelRow,
    number,
    getSumm,
    getNDS,
    getTotal,
    getNomenclature,
    getQuantity,
    getPrice,
}) {
    return (
        <>
            <div
                onClick={(event) => getDelRow(event, number)}
                className={
                    highlight === false
                        ? classes.position
                        : classes.position + " " + classes.highlight
                }
            >
                <div className={classes.position_number}>{number}</div>
                <div className={classes.position_nomenclature}>
                    <MyInput
                        style={{
                            display: "flex",
                            flex: "1 1 100%",
                            width: "100%",
                        }}
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
