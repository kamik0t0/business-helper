import { useState } from "react";

export function useTab(initialState) {
    const [tab, setTab] = useState(initialState);
    const showTab = () => setTab(!tab);
    return [tab, showTab];
}
