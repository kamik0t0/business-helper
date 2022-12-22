import axios from "axios";
import { useTypedDispatch } from "../redux/hooks/hooks";
import { setAuth } from "../redux/reducers/authSlice";

export const useAuth = () => {
    const dispatch = useTypedDispatch();
    const checkAuth = async (token: string) => {
        try {
            const response = await axios.get(
                "http://localhost:5600/login/checkAuth",
                {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log(response);

            localStorage.setItem("token", response.data.access);
            dispatch(setAuth(true));
        } catch (e: any) {
            console.log(e);
        }
    };
    // finally {
    //     this.setLoading(false);
    // }
    return checkAuth;
};
