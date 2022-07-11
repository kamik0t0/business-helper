import classes from "./styles/patch-fields.module.css";
import { useContext } from "react";
import MyButton from "../../../../UI/input/MyButton/MyButton";
import MyInput from "../../../../UI/input/MyInput/MyInput";
import PropTypes from "prop-types";
import { usePatchField } from "../hooks/usePatchField";
import { PatchContext } from "../../update-org/Patch-org";

export default function PatchField({ requisite, fieldNumber }) {
    const { getInputLengthLimit } = useContext(PatchContext);

    const [focus, prevValue, newValue, Ok, Cancel] = usePatchField(
        requisite,
        fieldNumber
    );

    const defInputValue = prevValue.current && prevValue.current.innerHTML;

    return (
        <div id={fieldNumber} className={classes.content}>
            {focus ? (
                <div className={classes.redactable}>
                    {/* TODO: создать новый компонент PatchInput */}
                    <MyInput
                        ref={newValue}
                        prevValue={prevValue.current}
                        field={requisite.field}
                        name={requisite.name}
                        type="text"
                        length={requisite.inputValueLength}
                        isNumber={requisite.num}
                        getValue={getInputLengthLimit}
                        defaultValue={defInputValue}
                    />
                    <div className={classes.buttons}>
                        <MyButton
                            onClick={Ok}
                            style={{
                                width: "50px",
                            }}
                        >
                            Ок
                        </MyButton>
                        <MyButton onClick={Cancel}>Отмена</MyButton>
                    </div>
                </div>
            ) : (
                <>
                    <div className={classes.requisit_name}>
                        {requisite.name}
                    </div>
                    <div ref={prevValue} className={classes.requisit_value}>
                        {/* отображение дефолтного или измененного значения */}
                        {newValue.current
                            ? newValue.current.value
                            : requisite.value}
                    </div>
                </>
            )}
        </div>
    );
}

PatchField.propTypes = {
    requisite: PropTypes.object.isRequired,
    fieldNumber: PropTypes.number.isRequired,
};
