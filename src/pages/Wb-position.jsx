// строка в создаваемой накладной (позиция)
import React from "react";
import classes from "./wbposition.module.css";

export default function WbPosition({
    highlight,
    getDelRow,
    number,
    summ,
    NDS,
    total,
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
                    <input
                        className={classes.position_nomenclature_input}
                        onChange={(event) => getNomenclature(event, number)}
                        type="text"
                    />
                </div>
                <div className={classes.position_quantity}>
                    <input
                        onChange={(event) => getQuantity(event, number)}
                        type="number"
                    />
                </div>
                <div className={classes.position_price}>
                    <input
                        onChange={(event) => getPrice(event, number)}
                        type="number"
                    />
                </div>
                <div className={classes.position_summ}>{summ.toFixed(2)}</div>
                <div className={classes.position_NDSprcnt}>{20}</div>
                <div className={classes.position_NDS}>{NDS.toFixed(2)}</div>
                <div className={classes.position_total}>{total.toFixed(2)}</div>
            </div>
        </>
    );
}
