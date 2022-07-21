import { OrgsState } from "../../interfaces/organization";

export function orgFilter(
    state: OrgsState,
    action: { payload: number | string | null }
): void {
    if (action.payload === null) {
        state.org = null;
    } else {
        const [ORG] = state.orgs.filter(
            (org: { id: number }) => org.id === action.payload
        );
        state.org = ORG;
    }
}
// export function orgFilter(
//     state: OrgsState,
//     action: { payload: number | string | null }
// ): void {
//     if (action.payload === null) {
//         state.org = null;
//     } else {
//         const [ORG] =
//             typeof action.payload === "string"
//                 ? state.orgs.filter(
//                       (org: { orgname: string }) =>
//                           org.orgname === action.payload
//                   )
//                 : state.orgs.filter(
//                       (org: { id: number }) => org.id === action.payload
//                   );
//         state.org = ORG;
//     }
// }
