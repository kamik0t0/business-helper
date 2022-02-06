// строка в создаваемой накладной (позиция)
import React from "react";
import classes from "./wbposition.module.css";
import MyInput from "../utils/input/MyInput.jsx";

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
                <div className={classes.position_summ}>{summ.toFixed(2)}</div>
                <div className={classes.position_NDSprcnt}>{20}</div>
                <div className={classes.position_NDS}>{NDS.toFixed(2)}</div>
                <div className={classes.position_total}>{total.toFixed(2)}</div>
            </div>
        </>
    );
}
