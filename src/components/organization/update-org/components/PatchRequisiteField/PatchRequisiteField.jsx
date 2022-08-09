import PropTypes from "prop-types";
import Button from "../../../../../UI/input/Button/Button";
import TextField from "../../../../../UI/input/TextField/TextField";
import RequisiteFieldName from "../../../common/components/PatchRequisiteFieldName/PatchRequisiteFieldName";
import { usePatchField } from "../../service/hooks/usePatchField";
import classes from "./styles/patch-fields.module.css";

const inlineButtonStyle = {
    width: "50px",
};

export default function PatchRequisiteField({ requisite, fieldIndex }) {
    const [focus, prevValue, inputRef, Ok, Cancel, inputError, isInputError] =
        usePatchField(requisite, fieldIndex);

    const defaultInputValue = prevValue.current?.innerHTML;

    const actualRequisiteValue = inputRef.current?.value
        ? inputRef.current.value
        : requisite.value;

    return (
        <div id={fieldIndex} className={classes.content}>
            <RequisiteFieldName fieldName={requisite.inputFieldName} />
            {focus ? (
                <div className={classes.fields__item}>
                    <div className={classes.redactable}>
                        <TextField
                            ref={inputRef}
                            type="text"
                            length={requisite.inputValueLength}
                            isNumber={requisite.isNumber}
                            defaultValue={defaultInputValue}
                            error={inputError}
                            onChange={isInputError}
                        />
                        <div className={classes.buttons}>
                            <Button onClick={Ok} style={inlineButtonStyle}>
                                Ок
                            </Button>
                            <Button onClick={Cancel}>Отмена</Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div ref={prevValue} className={classes.requisit_value}>
                    {actualRequisiteValue}
                </div>
            )}
        </div>
    );
}

PatchRequisiteField.propTypes = {
    requisite: PropTypes.object.isRequired,
    fieldIndex: PropTypes.number.isRequired,
};
