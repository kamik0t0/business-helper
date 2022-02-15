import React from "react";
import classes from "./styles/org-info.module.css";
import PropTypes from "prop-types";

export default function OrgInfo({ myOrg, isORG }) {
    return (
        <>
            <div className={classes.info}>
                <div className={classes.info_item}>
                    <div className={classes.info_name}>Активная фирма: </div>

                    <div className={classes.info_value}>
                        {`${myOrg.opf} `}
                        {isORG ? `"${myOrg.orgname}"` : myOrg.orgname}
                    </div>
                </div>
                <div className={classes.info_item}>
                    <div className={classes.info_name}>ИНН / КПП: </div>
                    {isORG ? (
                        <div className={classes.info_value}>
                            {`${myOrg.inn} / ${myOrg.kpp}`}
                        </div>
                    ) : (
                        <div className={classes.info_value}>
                            {`${myOrg.inn} `}
                        </div>
                    )}
                </div>
                <div className={classes.info_item}>
                    <div className={classes.info_name}>Адрес: </div>
                    <div className={classes.info_value}>{myOrg.address}</div>
                </div>
                {isORG && (
                    <div className={classes.info_item}>
                        <div className={classes.info_name}>Руководитель: </div>
                        <div className={classes.info_value}>
                            {myOrg.director}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

OrgInfo.propTypes = {
    myOrg: PropTypes.object.isRequired,
    isORG: PropTypes.bool.isRequired,
};
