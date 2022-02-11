import React from "react";

export default function Calculator() {
    return (
        <div id="conteiner">
            <br />
            <table id="detalisation" cellSpacing="3" cellPadding="3" border="1">
                <tbody>
                    <tr>
                        <td>
                            <h3>Показатель</h3>
                        </td>
                        <td>
                            <h3>Формула</h3>
                        </td>
                        <td>
                            <h3>Сумма</h3>
                        </td>
                    </tr>
                    <tr>
                        <td className="sectionName" colSpan="3">
                            Планируемые показатели за год:
                        </td>
                    </tr>
                    <tr>
                        <td>Доходы (Д)</td>
                        <td></td>
                        <td id="income"></td>
                    </tr>
                    <tr>
                        <td>Фонд оплаты труда (ФОТ)</td>
                        <td></td>
                        <td id="salary"></td>
                    </tr>

                    <tr>
                        <td className="sectionName" colSpan="2">
                            1. Страховые взносы:
                        </td>
                        <td id="totalCost"></td>
                    </tr>
                    <tr>
                        <td>1.1. Страховые взносы с работников</td>
                        <td className="formula">(ФОТ) * 30,2%</td>
                        <td id="salaryTax"></td>
                    </tr>
                    <tr>
                        <td colSpan="2">1.2. В ФОМС за себя (фикс)</td>

                        <td>8426</td>
                    </tr>

                    <tr>
                        <td colSpan="2">1.3. В ПФР за себя (фикс)</td>

                        <td>32448</td>
                    </tr>
                    <tr>
                        <td>1.4. в ПФР за себя (с доходов)</td>
                        <td className="formula">((Д) - 300000)) * 1%</td>
                        <td id="retirementFloatInsurance"></td>
                    </tr>
                    <tr>
                        <td className="sectionName">2. Налог УСН:</td>
                        <td className="formula">(2.1) - (2.2)</td>
                        <td id="usn"></td>
                    </tr>
                    <tr>
                        <td>2.1. Налог начислено</td>
                        <td>(Д) * 6%</td>
                        <td id="usnAccrued"></td>
                    </tr>
                    <tr>
                        <td>2.2. Вычет страховых взносов</td>
                        <td id="recoupmentName" className="formula"></td>
                        <td id="recoupmentValue"></td>
                    </tr>
                    <tr>
                        <td>3. Итого к уплате (налоги и взносы):</td>
                        <td className="formula">(1) + (2)</td>
                        <td id="totalTax"></td>
                    </tr>
                    <tr>
                        <td className="sectionName">Налоговая нагрузка, %:</td>
                        <td className="formula">(3) / (Д) * 100</td>
                        <td id="burden"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
