export function checkInputs(Updated, org) {
    for (const field in Updated) {
        if (Updated[field] === undefined) delete Updated[field];
        if (Updated["lngth"]) delete Updated["lngth"];
        if (
            Updated[field] !== org[field] &&
            field !== "upINN" &&
            Updated[field] !== undefined
        )
            return true;
    }
    return false;
}
