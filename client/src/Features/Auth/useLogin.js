import { useDispatch } from "react-redux";
import authSlice from "./state/authSlice.js";
import useAlert from "../Alert/useAlert.js";
import fetcher from "../../utils/fetcher.js";

const { loginSuccess, loginFailed, logout } = authSlice.actions;

const useLogin = () => {
    const dispatch = useDispatch();
    const createAlert = useAlert();

    const alertErrors = (errors) => {
        errors.forEach(error => {
            createAlert(error.msg, 'danger')
        })
    }

    const loginFailRemoveToken = () => {
        dispatch(loginFailed());
        localStorage.removeItem('token')  
    }

    const loginAndSaveToken = (payload) => {
        dispatch(loginSuccess(payload));
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

            console.log(resJson);

            if(resJson.errors) {
                alertErrors(resJson.errors);
                loginFailRemoveToken()
            } else {
                loginAndSaveToken(resJson);
            }
        } catch (error) {
            loginFailRemoveToken()
            console.log(error);
            createAlert("Something went wrong, try again later.", 'danger')
        }
    }

    const logoutUser = () => {
        dispatch(logout());
        localStorage.removeItem('token')  
        console.log("User logout");
    }

    return [ login, logoutUser ];
}

export default useLogin;