import MyInput from "../../../../../UI/input/MyInput/MyInput.jsx";
import PropTypes from "prop-types";

export default function Inputs({ fields, getValue }) {
    return (
        <>
            {fields.map((field) => {
                return (
                    <MyInput
                        key={field.field}
                        name={field.name}
                        type={field.type}
                        field={field.field}
                        length={field.inputValueLength}
                        isNumber={field.num}
                        getValue={getValue}
                    />
                );
            })}
        </>
    );
}

Inputs.propTypes = {
    fields: PropTypes.array.isRequired,
    getValue: PropTypes.func.isRequired,
};
