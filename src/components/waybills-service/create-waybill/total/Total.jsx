import classes from "./styles/total.module.css";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";

const totalInfos = [
    {
        field: "summ",
        name: "Сумма:",
    },
    {
        field: "NDS",
        name: "НДС:",
    },
    {
        field: "total",
        name: "Итого:",
    },
];

function Total({ array, field, name, total }) {
    return (
        <div className={classes.total}>
            <div className={classes.total_name}>{name}</div>
            <div className={classes.total_value}>
                {total(array, field).toFixed(2)}
            </div>
        </div>
    );
}

export function TotalWrapper({ positions, setTotal }) {
    return (
        <div className={classes.totalWrapper}>
            {totalInfos.map((totalInfo) => {
                return (
                    <Total
                        key={uuid()}
                        array={positions}
                        field={totalInfo.field}
                        name={totalInfo.name}
                        total={setTotal}
                    />
                );
            })}
        </div>
    );
}

Total.propTypes = {
    array: PropTypes.array.isRequired,
    field: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    total: PropTypes.func.isRequired,
};

TotalWrapper.propTypes = {
    positions: PropTypes.array.isRequired,
    setTotal: PropTypes.func.isRequired,
};
