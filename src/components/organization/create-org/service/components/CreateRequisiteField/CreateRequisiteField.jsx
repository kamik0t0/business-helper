import classes from "./styles/create-fields.module.css";
import RequisiteInput from "../../../../../../UI/input/RequisiteInput/RequisiteInput";
import PropTypes from "prop-types";
import { useCreateField } from "../../hooks/useCreateField";
import RequisiteFieldName from "../../../../common/components/PatchRequisiteFieldName/PatchRequisiteFieldName";

export default function CreateRequisiteField({ requisite, fieldIndex }) {
    const [getInputValue, inputError, isInputError] = useCreateField(requisite);

    return (
        <div id={fieldIndex} className={classes.content}>
            <RequisiteFieldName fieldName={requisite.inputFieldName} />
            <div className={classes.fields__item}>
                <div className={classes.redactable}>
                    <RequisiteInput
                        length={requisite.inputValueLength}
                        isNumber={requisite.isNumber}
                        defaultValue={requisite.value}
                        getInputValue={getInputValue}
                        error={inputError}
                        isInputError={isInputError}
                    />
                </div>
            </div>
        </div>
    );
}

CreateRequisiteField.propTypes = {
    requisite: PropTypes.object.isRequired,
    fieldIndex: PropTypes.number.isRequired,
};
