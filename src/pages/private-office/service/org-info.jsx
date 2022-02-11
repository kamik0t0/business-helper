import React from "react";
import classes from "./styles/org-info.module.css";

export default function OrgInfo({ myOrg, isORG }) {
    return (
        <>
            <div className={classes.info}>
                <div className={classes.info_item}>
                    <div className={classes.info_name}>Активная фирма: </div>

                    <div className={classes.info_value}>
                        {`${myOrg.opf} `}
                        {isORG.current ? `"${myOrg.orgname}"` : myOrg.orgname}
                    </div>
                </div>
                <div className={classes.info_item}>
                    <div className={classes.info_name}>ИНН / КПП: </div>
                    {isORG.current ? (
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
                {isORG.current && (
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
