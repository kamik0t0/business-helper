import { useState } from "react";

export function useTab(initialState: boolean): [boolean, () => void] {
    const [tab, setTab] = useState(initialState);
    const showTab = () => setTab(!tab);
    return [tab, showTab];
}
