import PropTypes from "prop-types";
import PatchRequisiteField from "../../update-org/components/PatchRequisiteField/PatchRequisiteField";

const PatchRequisiteFieldsWrapper = ({ PatchFields }) => {
    return (
        <>
            {PatchFields.map((requisite, index) => {
                return (
                    <PatchRequisiteField
                        key={requisite.inputField}
                        requisite={requisite}
                        fieldIndex={index}
                    />
                );
            })}
        </>
    );
};

PatchRequisiteFieldsWrapper.propTypes = {
    PatchFields: PropTypes.array.isRequired,
};

export default PatchRequisiteFieldsWrapper;
