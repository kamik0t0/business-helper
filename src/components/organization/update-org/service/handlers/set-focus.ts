export const setInputFocus = (input: HTMLInputElement | null): void => {
    // фокусировка на смонтированный input
    let observer = new MutationObserver((mutations: any) => {
        mutations[1]?.addedNodes[0]?.firstChild?.focus();
    });
    input &&
        observer.observe(input, {
            childList: true,
            subtree: true,
        });
};
