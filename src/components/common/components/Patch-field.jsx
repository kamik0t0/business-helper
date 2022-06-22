import classes from "./styles/patch-fields.module.css";
import MyButton from "../../../UI/input/MyButton/MyButton";
import MyInput from "../../../UI/input/MyInput/MyInput";
import PropTypes from "prop-types";
import { usePatchField } from "../hooks/usePatchField";

export default function PatchField({
    requisite,
    number,
    getInputValue,
    setInputValue,
}) {
    const [focus, prevValue, currentValue, Ok, Cancel] = usePatchField(
        requisite,
        number,
        setInputValue
    );
    const defInputValue = prevValue.current && prevValue.current.innerHTML;

    return (
        <div id={number} className={classes.content}>
            {focus ? (
                <div className={classes.redactable}>
                    <MyInput
                        ref={currentValue}
                        prevValue={prevValue.current}
                        field={requisite.field}
                        name={requisite.name}
                        type="text"
                        length={requisite.lngth}
                        isNumber={requisite.num}
                        getValue={getInputValue}
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
                        {currentValue.current
                            ? currentValue.current.value
                            : requisite.value}
                    </div>
                </>
            )}
        </div>
    );
}

PatchField.propTypes = {
    requisite: PropTypes.object.isRequired,
    number: PropTypes.number.isRequired,
};
