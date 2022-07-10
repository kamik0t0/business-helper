export function checkInputs(Updated, USERORG) {
    for (const field in Updated) {
        if (Updated[field] === undefined) delete Updated[field];
        if (Updated["lngth"]) delete Updated["lngth"];
        if (
            Updated[field] !== USERORG[field] &&
            field !== "upINN" &&
            Updated[field] !== undefined
        )
            return true;
    }
    return false;
}
