import PropTypes from "prop-types";
import TextField from "../../../../../../UI/input/TextField/TextField";
import RequisiteFieldName from "../../../../common/components/PatchRequisiteFieldName/PatchRequisiteFieldName";
import classes from "./styles/create-fields.module.css";
import { useInputField } from "../../hooks/useInputField";

const RequisiteInputField = ({ requisite, fieldIndex }) => {
    const [getIndex, getValue, error, inputValidation] = useInputField(
        requisite,
        fieldIndex
    );

    return (
        <div id={fieldIndex} className={classes.content}>
            <RequisiteFieldName fieldName={requisite.inputFieldName} />
            <div className={classes.fields__item}>
                <div className={classes.redactable}>
                    <TextField
                        type="text"
                        length={requisite?.inputValueLength}
                        isNumber={requisite.isNumber}
                        defaultValue={requisite.value}
                        error={error}
                        onInput={inputValidation}
                        onChange={getValue}
                        onFocus={getIndex}
                        focus={requisite.focus}
                    />
                </div>
            </div>
        </div>
    );
};

export default RequisiteInputField;

RequisiteInputField.propTypes = {
    requisite: PropTypes.object.isRequired,
    fieldIndex: PropTypes.number.isRequired,
};
