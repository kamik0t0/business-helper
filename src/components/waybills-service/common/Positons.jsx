import Position from "./position/Position.jsx";
import PropTypes from "prop-types";

const Positons = ({ positions }) => {
    return (
        <>
            {Array.isArray(positions) &&
                positions.map((position, index) => {
                    return (
                        <Position
                            key={position.item_number}
                            position={position}
                            positionIndex={index}
                        />
                    );
                })}
        </>
    );
};

Positons.propTypes = {
    positions: PropTypes.array.isRequired,
};

export default Positons;
