import { createContext } from "react";

export const CustomContext = <A extends {} | null>() => {
    const context = createContext<A | undefined>(undefined);
    return context;
};
