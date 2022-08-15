import { memo } from "react";
import { isOrganization } from "../../../utils/isOrganization";
import classes from "./styles/org-info.module.css";
import { IOrg } from "../../../interfaces/organization";

type OrgInfoTypes = {
    USERORG: IOrg;
};

const OrgInfo: React.FC<OrgInfoTypes> = memo(({ USERORG }) => {
    const isORG = USERORG != null && isOrganization(USERORG);
    return (
        <>
            {USERORG != null && (
                <div className={classes.info}>
                    <div className={classes.info_item}>
                        <div className={classes.info_name}>
                            Активная фирма:{" "}
                        </div>

                        <div className={classes.info_value}>
                            {`${USERORG.opf} `}
                            {isORG ? USERORG.orgname : USERORG.orgname}
                        </div>
                    </div>
                    <div className={classes.info_item}>
                        <div className={classes.info_name}>ИНН / КПП: </div>
                        {isORG ? (
                            <div className={classes.info_value}>
                                {`${USERORG.inn} / ${USERORG.kpp}`}
                            </div>
                        ) : (
                            <div className={classes.info_value}>
                                {USERORG.inn}
                            </div>
                        )}
                    </div>
                    <div className={classes.info_item}>
                        <div className={classes.info_name}>Адрес: </div>
                        <div className={classes.info_value}>
                            {USERORG.address}
                        </div>
                    </div>
                    {isORG && (
                        <div className={classes.info_item}>
                            <div className={classes.info_name}>
                                Руководитель:
                            </div>
                            <div className={classes.info_value}>
                                {USERORG.director}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
});

export default OrgInfo;
