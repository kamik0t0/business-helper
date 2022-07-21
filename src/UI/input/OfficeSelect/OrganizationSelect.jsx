import classes from "./styles/my-select.module.css";

const OrganizationSelect = ({ options, selectUserOrg, defaultValue }) => {
    return (
        <>
            <div className={classes.fields__item}>
                <select
                    onChange={selectUserOrg}
                    className={classes.fields__item_input}
                    defaultValue={defaultValue}
                >
                    {options.map((option, index) => {
                        if (index === 0) {
                            return (
                                <option key={index} disabled>
                                    {option}
                                </option>
                            );
                        } else {
                            return <option key={index}>{option}</option>;
                        }
                    })}
                </select>
            </div>
        </>
    );
};
export default OrganizationSelect;
