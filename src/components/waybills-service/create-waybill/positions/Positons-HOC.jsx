import React from "react";
import Position from "../position/Position.jsx";
import PropTypes from "prop-types";

const Positons = ({ positions, highlightPosition, getPositionValues }) => {
    return (
        <>
            {positions.map((item, index) => {
                return (
                    <Position
                        key={item.number}
                        item={item}
                        highlight={item.highlight}
                        highlightPosition={highlightPosition}
                        number={index}
                        getPositionValues={getPositionValues}
                    />
                );
            })}
        </>
    );
};

Positons.propTypes = {
    positions: PropTypes.array.isRequired,
    highlightPosition: PropTypes.func.isRequired,
    getPositionValues: PropTypes.func.isRequired,
};

export default Positons;
