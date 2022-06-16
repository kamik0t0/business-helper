export function highlightOff(waybills, WAYBILL, showUpdateModal) {
    if (Object.keys(WAYBILL).length === 0) {
        showUpdateModal();
    }
    waybills.forEach((pos) => {
        if (pos.highlight === true) pos.highlight = false;
    });

    return waybills;
}
