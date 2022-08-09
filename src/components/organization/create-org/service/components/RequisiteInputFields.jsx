import PropTypes from "prop-types";
import { uuid } from "uuidv4";
import RequisiteInputField from "./CreateRequisiteField/RequisiteInputField.jsx";

const RequisiteInputFields = ({ RequisiteInputFields }) => {
    return (
        <>
            {RequisiteInputFields.map((requisiteInput, index) => {
                return (
                    <RequisiteInputField
                        key={uuid()}
                        requisite={requisiteInput}
                        fieldIndex={index}
                    />
                );
            })}
        </>
    );
};

export default RequisiteInputFields;

RequisiteInputFields.propTypes = {
    CreateFields: PropTypes.array.isRequired,
    getInputValue: PropTypes.func.isRequired,
};
