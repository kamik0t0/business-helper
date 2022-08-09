import { IInvoice } from "../../../../../interfaces/invoice";

// сортировки по:
// - дате
export function sortByDate(
    invoices: IInvoice[],
    sortOrder: boolean
): IInvoice[] {
    return sortOrder
        ? invoices.sort(
              (a, b) =>
                  Date.parse(a.waybill_date!) - Date.parse(b.waybill_date!)
          )
        : invoices.sort(
              (a, b) =>
                  Date.parse(b.waybill_date!) - Date.parse(a.waybill_date!)
          );
}
// - контрагенту
export function sortByCounterparty(
    invoices: IInvoice[],
    sortOrder: boolean
): IInvoice[] {
    return sortOrder
        ? invoices.sort((a, b) => a.cl_orgname!.localeCompare(b.cl_orgname!))
        : invoices.sort((a, b) => b.cl_orgname!.localeCompare(a.cl_orgname!));
}
// - сумме
export function sortBySumm(
    invoices: IInvoice[],
    sortOrder: boolean
): IInvoice[] {
    return sortOrder
        ? invoices.sort((a, b) => +a.summ - +b.summ)
        : invoices.sort((a, b) => +b.summ - +a.summ);
}
// - id
export function sortById(invoices: IInvoice[], sortOrder: boolean): IInvoice[] {
    return sortOrder
        ? invoices.sort((a, b) => a.id! - b.id!)
        : invoices.sort((a, b) => b.id! - a.id!);
}
