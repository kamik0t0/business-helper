export function setValue(event, field, newValue, Updated) {
    if (!Updated.current["lngth"]) {
        Updated.current[field] = newValue.trim();
        return true;
    }
    if (newValue.length !== Updated.current["lngth"]) return false;
    Updated.current[field] = newValue.trim();
    return true;
}
