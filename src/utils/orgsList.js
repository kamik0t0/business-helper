// функция создает массив строк вместо массива объектов - ренедрится в выпадающий список организаций
export function makeOrgsArr(organizations) {
    try {
        return [
            "Выбрать организацию",
            ...organizations.map(
                (org) => `${Object.values(org.orgname).join("")}`
            ),
        ];
    } catch (error) {
        console.log(error);
    }
}
