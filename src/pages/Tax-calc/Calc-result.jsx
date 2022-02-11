import React from "react";

// получаем некоторые значения через props из родительского компонента
export default function CalcResult({
    classes,
    taxIncomeIE,
    burdenIncomeIE,
    taxIncomeLLC,
    burdenIncomeLLC,
}) {
    return (
        <div id="result" className={classes.result}>
            <div className={classes.result_fields_ie}>
                <div className={classes.result_fields_ie_header}>
                    <div className={classes.result_fields_ie_header_name}>
                        Налоговые режимы ИП
                    </div>
                    <div className={classes.result_fields_ie_header_name}>
                        Сумма налогов (руб.)
                    </div>
                    <div className={classes.result_fields_ie_header_name}>
                        Налоговая нагрузка (%)
                    </div>
                </div>
                <div className={classes.result_fields_ie_incomes}>
                    <div className={classes.result_fields_name}>
                        УСН (доходы)
                    </div>
                    <div className={classes.result_fields_calc}>
                        {taxIncomeIE}
                    </div>
                    <div className={classes.result_fields_calc}>
                        {burdenIncomeIE}
                    </div>
                </div>
                <div className={classes.result_fields_ie_costs}>
                    <div className={classes.result_fields_name}>
                        УСН (доходы - расходы)
                    </div>
                    <div className={classes.result_fields_calc}>0</div>
                    <div className={classes.result_fields_calc}>0</div>
                </div>
                <div className={classes.result_fields_ie_common}>
                    <div className={classes.result_fields_name}>Общий</div>
                    <div className={classes.result_fields_calc}>0</div>
                    <div className={classes.result_fields_calc}>0</div>
                </div>
            </div>
            <div className={classes.result_fields_org}>
                <div className={classes.result_fields_org_header}>
                    <div className={classes.result_fields_org_header_name}>
                        Налоговые режимы ООО
                    </div>
                    <div className={classes.result_fields_org_header_name}>
                        Сумма налогов (руб.)
                    </div>
                    <div className={classes.result_fields_org_header_name}>
                        Налоговая нагрузка (%)
                    </div>
                </div>
                <div className={classes.result_fields_org_incomes}>
                    <div className={classes.result_fields_name}>
                        УСН (доходы)
                    </div>
                    <div className={classes.result_fields_calc}>
                        {taxIncomeLLC}
                    </div>
                    <div className={classes.result_fields_calc}>
                        {burdenIncomeLLC}
                    </div>
                </div>
                <div className={classes.result_fields_org_costs}>
                    <div className={classes.result_fields_name}>
                        УСН (доходы - расходы)
                    </div>
                    <div className={classes.result_fields_calc}>0</div>
                    <div className={classes.result_fields_calc}>0</div>
                </div>
                <div className={classes.result_fields_org_common}>
                    <div className={classes.result_fields_name}>Общий</div>
                    <div className={classes.result_fields_calc}>0</div>
                    <div className={classes.result_fields_calc}>0</div>
                </div>
            </div>
        </div>
    );
}
