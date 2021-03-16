import { useDispatch } from "react-redux";
import authSlice from "../state/authSlice.js";
import fetcher from "../../../utils/fetcher.js";

const { USER_LOADED, AUTH_ERROR } = authSlice.actions;

const useLoadUser = () => {
    const dispatch = useDispatch();

    const loadUser = async () => {
        try{
            const res = await fetcher('/api/auth')
            const resJson = await res.json();
            if(res.status !== 200) {
                localStorage.removeItem('token');
                dispatch(AUTH_ERROR());
            } else {
                dispatch(USER_LOADED(resJson)); 
            }
        } catch (error) {
            localStorage.removeItem('token');
            dispatch(AUTH_ERROR());
        }
    }

    return loadUser
}

export default useLoadUser;