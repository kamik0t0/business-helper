export function setFocus(number, refresh, setRefresh) {
    let target = document.getElementById(number);
    // обработчик для переключения на input
    target.addEventListener("click", () => {
        setRefresh(!refresh);
    });
    // фокусировка на появляющемся input
    let observer = new MutationObserver((mutations) => {
        try {
            mutations[2].addedNodes[0].lastChild.focus();
        } catch (error) {
            console.log("no focus");
        }
    });
    observer.observe(target, {
        childList: true,
        subtree: true,
    });
}
