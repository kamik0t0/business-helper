import Position from "./position/Position";
import { IInvoicePosition } from "../../../interfaces/invoice";

type PositionsType = {
    positions: IInvoicePosition[] | null;
};

const Positons: React.FC<PositionsType> = ({ positions }) => {
    return (
        <>
            {Array.isArray(positions) &&
                positions.map((position: IInvoicePosition, index: number) => {
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

export default Positons;
