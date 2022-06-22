import PropTypes from "prop-types";
import PatchField from "./Patch-field.jsx";

const PatchFieldsWrapper = ({ requisites, getInputValue, setInputValue }) => {
    return (
        <>
            {requisites.map((requisite, number) => {
                return (
                    <PatchField
                        key={requisite.field}
                        number={number}
                        requisite={requisite}
                        getInputValue={getInputValue}
                        setInputValue={setInputValue}
                    />
                );
            })}
        </>
    );
};

PatchFieldsWrapper.propTypes = {
    requisites: PropTypes.array.isRequired,
};

export default PatchFieldsWrapper;
