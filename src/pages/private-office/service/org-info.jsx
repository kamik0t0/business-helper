import React from "react";
import classes from "./styles/org-info.module.css";
import PropTypes from "prop-types";

export default function OrgInfo({ MYORG, isORG }) {
    console.log(isORG);
    return (
        <>
            <div className={classes.info}>
                <div className={classes.info_item}>
                    <div className={classes.info_name}>Активная фирма: </div>

                    <div className={classes.info_value}>
                        {`${MYORG.opf} `}
                        {isORG ? `"${MYORG.orgname}"` : MYORG.orgname}
                    </div>
                </div>
                <div className={classes.info_item}>
                    <div className={classes.info_name}>ИНН / КПП: </div>
                    {isORG ? (
                        <div className={classes.info_value}>
                            {`${MYORG.inn} / ${MYORG.kpp}`}
                        </div>
                    ) : (
                        <div className={classes.info_value}>
                            {`${MYORG.inn} `}
                        </div>
                    )}
                </div>
                <div className={classes.info_item}>
                    <div className={classes.info_name}>Адрес: </div>
                    <div className={classes.info_value}>{MYORG.address}</div>
                </div>
                {isORG && (
                    <div className={classes.info_item}>
                        <div className={classes.info_name}>Руководитель: </div>
                        <div className={classes.info_value}>
                            {MYORG.director}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

OrgInfo.propTypes = {
    MYORG: PropTypes.object.isRequired,
    isORG: PropTypes.bool.isRequired,
};
