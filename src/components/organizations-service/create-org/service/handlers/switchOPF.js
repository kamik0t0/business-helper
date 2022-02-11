// выбор организационно-правовой формы - добавляем/удаляем поля для ввода реквизитов
export function switchOPF(event, setIsOrg, ORG) {
    if (event.target.value === "Общество с ограниченной ответственностью") {
        setIsOrg(true);
        ORG.opf = "Общество с ограниченной ответственностью";
        ORG["kpp"] = undefined;
        ORG["director"] = undefined;
        console.log("ООО");
    } else {
        setIsOrg(false);
        ORG.opf = "Индивидуальный предприниматель";
        delete ORG["kpp"];
        delete ORG["director"];
        console.log("ИП");
    }
}
