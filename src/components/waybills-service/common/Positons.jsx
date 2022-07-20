import Position from "./position/Position.jsx";
import PropTypes from "prop-types";

const Positons = ({ positions, setPositions }) => {
    return (
        <>
            {positions.map((position, index) => {
                return (
                    <Position
                        key={position.item_number}
                        position={position}
                        positionIndex={index}
                        positions={positions}
                        setPositions={setPositions}
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
