// сортировки по:
// - дате
export function sortByDate(waybills, sortOrder) {
    return sortOrder
        ? waybills.sort(
              (a, b) => Date.parse(a.waybill_date) - Date.parse(b.waybill_date)
          )
        : waybills.sort(
              (a, b) => Date.parse(b.waybill_date) - Date.parse(a.waybill_date)
          );
}
// - контрагенту
export function sortByCounterparty(waybills, sortOrder) {
    return sortOrder
        ? waybills.sort((a, b) => a.cl_orgname.localeCompare(b.cl_orgname))
        : waybills.sort((a, b) => b.cl_orgname.localeCompare(a.cl_orgname));
}
// - сумме
export function sortBySumm(waybills, sortOrder) {
    return sortOrder
        ? waybills.sort((a, b) => a.summ - b.summ)
        : waybills.sort((a, b) => b.summ - a.summ);
}
// - id
export function sortById(waybills, sortOrder) {
    return sortOrder
        ? waybills.sort((a, b) => a.id - b.id)
        : waybills.sort((a, b) => b.id - a.id);
}
