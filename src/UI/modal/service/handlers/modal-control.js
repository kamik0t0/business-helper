export function modalManager(setModal) {
    function showModal() {
        setModal((prev) => ({ ...prev, show: true }));
        setTimeout(() => {
            setModal((prev) => ({ ...prev, add: true }));
        }, 0);
    }
    function hideModal() {
        setModal((prev) => ({ ...prev, add: false }));
        setTimeout(() => {
            setModal((prev) => ({ ...prev, show: false }));
        }, 500);
    }
    return [showModal, hideModal];
}
