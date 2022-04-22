export function clear() {
    for (const input of document.querySelectorAll("input")) {
        input.value = "";
    }
}
