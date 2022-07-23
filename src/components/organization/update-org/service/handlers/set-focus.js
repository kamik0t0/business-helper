export function setInputFocus(input) {
    // фокусировка на смонтированный input
    let observer = new MutationObserver((mutations) => {
        try {
            mutations[1].addedNodes[0].firstChild.focus();
        } catch (error) {
            console.log("no focus");
        }
    });
    observer.observe(input, {
        childList: true,
        subtree: true,
    });
}
