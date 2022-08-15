import PropTypes from "prop-types";
import { IRequisiteView } from "../../../../interfaces/requisite";
import PatchRequisiteField from "../../update-org/components/PatchRequisiteField/PatchRequisiteField";

type PatchRequisiteFieldsWrapperTypes = {
    PatchFields: IRequisiteView[];
};

const PatchRequisiteFieldsWrapper: React.FC<
    PatchRequisiteFieldsWrapperTypes
> = ({ PatchFields }) => {
    return (
        <>
            {PatchFields.map((requisite: IRequisiteView) => {
                return (
                    <PatchRequisiteField
                        key={requisite.inputField}
                        requisite={requisite}
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
