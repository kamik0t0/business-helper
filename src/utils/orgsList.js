// функция создает массив строк вместо массива объектов - ренедрится в выпадающий список организаций
export function makeOrgsArr(array) {
    try {
        return [
            "Выбрать организацию",
            ...array.map(
                (object) => `${Object.values(object.orgname).join("")}`
            ),
        ];
    } catch (error) {
        console.log(
            "No orgs in localstorage. Probably no connection to server/"
        );
    }
}
