import PropTypes from "prop-types";
import PatchField from "./Patchfield";

const PatchFieldsWrapper = ({ OrgData }) => {
    return (
        <>
            {OrgData.map((requisite, number) => {
                return (
                    <PatchField
                        key={requisite.field}
                        fieldNumber={number}
                        requisite={requisite}
                    />
                );
            })}
        </>
    );
};

PatchFieldsWrapper.propTypes = {
    OrgData: PropTypes.array.isRequired,
};

export default PatchFieldsWrapper;
