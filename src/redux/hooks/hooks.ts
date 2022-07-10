import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store";

// используем вместо обычных useSelector и useDispatch типизированные в соответствие с созданным типами на основании store useAppSelector и useAppDispatch. Эти хуки знают про наше приложение, т.е. useAppSelector знает про наш store, а useAppDispatch знает какие экшены и какого типа должны быть переданы
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
