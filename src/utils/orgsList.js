// функция создает массив строк вместо массива объектов - ренедрится в выпадающий список организаций
export const makeOrgsArr = (organizations = []) => [
    "Выбрать организацию",
    ...organizations.map((org) => `${Object.values(org.orgname).join("")}`),
];
