import classes from "./styles/req-field.module.css";
import { v4 as uuid } from "uuid";
import { IRequisiteView } from "../../../../../interfaces/requisite";

const ShowRequisite: React.FC<{ requisite: IRequisiteView }> = ({
    requisite,
}) => {
    return (
        <div key={uuid()}>
            {requisite !== null && (
                <div className={classes.content}>
                    <div className={classes.requisit_name}>
                        {requisite.inputFieldName}
                    </div>
                    <div className={classes.requisit_value}>
                        {requisite.value}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowRequisite;
