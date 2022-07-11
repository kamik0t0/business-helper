export function setInputFocus(input) {
    // фокусировка на смонтированный input
    let observer = new MutationObserver((mutations) => {
        try {
            mutations[2].addedNodes[0].lastChild.focus();
        } catch (error) {
            console.log("no focus");
        }
    });
    observer.observe(input, {
        childList: true,
        subtree: true,
    });
}
