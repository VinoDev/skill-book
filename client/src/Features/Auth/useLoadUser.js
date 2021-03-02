import { useDispatch } from "react-redux";
import authSlice from "./state/authSlice.js";
import fetcher from "../../utils/fetcher.js";

const { userLoaded, authError } = authSlice.actions;

const useLoadUser = () => {
    const dispatch = useDispatch();

    const loadUser = async () => {
        try{
            const res = await fetcher('/api/auth')
            const resJson = await res.json();
            if(res.status !== 200) {
                console.log("loadUser failed");
                localStorage.removeItem('token');
                dispatch(authError());
            } else {
                dispatch(userLoaded(resJson)); 
            }
        } catch (error) {
            console.log("loadUser failed");
            localStorage.removeItem('token');
            dispatch(authError());
        }
    }

    return loadUser
}

export default useLoadUser;