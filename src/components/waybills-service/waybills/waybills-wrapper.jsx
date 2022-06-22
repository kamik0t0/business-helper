import React from "react";
import Waybill from "./waybill/Waybill.jsx";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";

const WaybillsWrapper = ({ waybills, getWaybill, highlightON }) => {
    return (
        <>
            {waybills.length > 0 &&
                waybills.map((waybill, index) => {
                    return (
                        <Waybill
                            key={uuid()}
                            index={index}
                            waybill={waybill}
                            getWaybill={getWaybill}
                            highlightON={highlightON}
                        />
                    );
                })}
        </>
    );
};

WaybillsWrapper.propTypes = {
    waybills: PropTypes.array,
    getWaybill: PropTypes.func.isRequired,
    highlightON: PropTypes.func.isRequired,
};

export default WaybillsWrapper;
