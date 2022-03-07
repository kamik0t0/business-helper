// сортировки по:
// - дате
export function sortByDate(waybills, setWaybills, sortOrder, setSortOrder) {
    console.log(waybills);
    sortOrder
        ? setWaybills([
              ...waybills.sort(
                  (a, b) =>
                      Date.parse(a.waybill_date) - Date.parse(b.waybill_date)
              ),
          ])
        : setWaybills([
              ...waybills.sort(
                  (a, b) =>
                      Date.parse(b.waybill_date) - Date.parse(a.waybill_date)
              ),
          ]);

    setSortOrder(!sortOrder);
}
// - контрагенту
export function sortByCtrprty(waybills, setWaybills, sortOrder, setSortOrder) {
    sortOrder
        ? setWaybills([
              ...waybills.sort((a, b) =>
                  a.cl_orgname.localeCompare(b.cl_orgname)
              ),
          ])
        : setWaybills([
              ...waybills.sort((a, b) =>
                  b.cl_orgname.localeCompare(a.cl_orgname)
              ),
          ]);

    setSortOrder(!sortOrder);
}
// - сумме
export function sortBySumm(waybills, setWaybills, sortOrder, setSortOrder) {
    sortOrder
        ? setWaybills([...waybills.sort((a, b) => a.summ - b.summ)])
        : setWaybills([...waybills.sort((a, b) => b.summ - a.summ)]);

    setSortOrder(!sortOrder);
}
// - id
export function sortById(waybills, setWaybills, sortOrder, setSortOrder) {
    sortOrder
        ? setWaybills([...waybills.sort((a, b) => a.id - b.id)])
        : setWaybills([...waybills.sort((a, b) => b.id - a.id)]);

    setSortOrder(!sortOrder);
}

// фильтрующая функция
export function filterList(event, bills, setWaybills, search) {
    let regexp = new RegExp(`${event.target.value.toLowerCase()}`, "g");
    console.log(regexp);
    setWaybills([
        ...bills.filter((item) => {
            return item[search].toString().toLowerCase().search(regexp) !== -1;
        }),
    ]);
}

// тормозящий декоратор - оптимизация чтобы не вызывать ререндер на каждое нажатие клавиши при поиске. Здесь по идее не нужно, поскольку запрос идет не к серверу и все происходит уже на клиенте, но решил внедрить в целях практики
export function throttle(func, isCooldown, savedArgs, savedThis) {
    const wrapper = (...args) => {
        if (isCooldown.current) {
            savedArgs.current = args;
            return;
        }
        func.apply(this, args);
        isCooldown.current = true;
        setTimeout(() => {
            isCooldown.current = false;
            if (savedArgs.current) {
                wrapper.apply(savedThis.current, savedArgs.current);
                savedArgs.current = savedThis.current = null;
            }
        }, 1000);
    };
    return wrapper;
}
