import { useCallback } from "react";
import { useTypedDispatch } from "../../../../redux/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { setInvoicePositions } from "../../../../redux/reducers/InvoiceSlice";

export const useGoBack = () => {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();

    const goBack = useCallback(
        (event: React.ChangeEvent<HTMLButtonElement>) => {
            event.preventDefault();
            navigate(-1);
            dispatch(setInvoicePositions([]));
        },
        [dispatch, navigate]
    );
    return goBack;
};
