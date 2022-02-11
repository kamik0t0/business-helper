export function showAnimatedModal(setState) {
    setState((prev) => {
        return { ...prev, show: true };
    });
    setTimeout(() => {
        setState((prev) => {
            return { ...prev, add: true };
        });
    }, 0);
}

export function hideAnimatedModal(setState) {
    setState((prev) => {
        return { ...prev, add: false };
    });
    setTimeout(() => {
        setState((prev) => {
            return { ...prev, show: false };
        });
    }, 500);
}
