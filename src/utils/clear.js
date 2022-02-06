export function clear(org) {
    for (const input of document.querySelectorAll("input")) {
        input.value = "";
    }
    document.getElementById("ORG").value = org || "Выбрать организацию";
}
