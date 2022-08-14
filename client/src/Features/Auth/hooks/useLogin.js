import { useDispatch } from "react-redux";
import authSlice from "../state/authSlice.js";
import useAlert from "../../Alert/hooks/useAlert.js";
import useLoadUser from './useLoadUser.js';

const { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } = authSlice.actions;

const useLogin = () => {
    const dispatch = useDispatch();
    const createAlert = useAlert();
    const loadUser = useLoadUser();

    const alertErrors = (errors) => {
        errors.forEach(error => {
            createAlert(error.msg, 'danger')
        })
    }

    const loginFailRemoveToken = () => {
        dispatch(LOGIN_FAILED());
        localStorage.removeItem('token')  
    }

    const loginAndSaveToken = (payload) => {
        dispatch(LOGIN_SUCCESS(payload));
        localStorage.setItem('token', payload.token)
    }

    const login = async ({ email, password }) => {
        try {
            const res = await fetch(`/api/auth`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },                
                body: JSON.stringify({ email, password })
            });
            const resJson = await res.json()

            if(resJson.errors) {
                alertErrors(resJson.errors);
                loginFailRemoveToken()
            } else {
                loginAndSaveToken(resJson);
                loadUser()
            }
        } catch (error) {
            loginFailRemoveToken()
            createAlert("Something went wrong, try again later.", 'danger')
        }
    }

    const logoutUser = () => {
        dispatch(LOGOUT());
        localStorage.removeItem('token')  
    }

    return [ login, logoutUser ];
}

export default useLogin;