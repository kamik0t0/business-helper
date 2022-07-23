import PropTypes from "prop-types";
import { uuid } from "uuidv4";
import CreateRequisiteField from "./CreateRequisiteField/CreateRequisiteField.jsx";

export default function CreateInputs({ CreateFields, getRequisiteValue }) {
    return (
        <>
            {CreateFields.map((requisiteInput, index) => {
                return (
                    <CreateRequisiteField
                        key={uuid()}
                        requisite={requisiteInput}
                        fieldIndex={index}
                        getRequisiteValue={getRequisiteValue}
                    />
                );
            })}
        </>
    );
}

CreateInputs.propTypes = {
    RequisiteInputs: PropTypes.array.isRequired,
};
