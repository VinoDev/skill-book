import { useDispatch } from "react-redux";
import authSlice from "../state/authSlice.js";
import useAlert from "../../Alert/hooks/useAlert.js";
import useLoadUser from '../../Auth/hooks/useLoadUser.js';

const { REGISTER_SUCCESS, REGISTER_FAIL } = authSlice.actions;

const useRegister = () => {
    const dispatch = useDispatch();
    const createAlert = useAlert();
    const loadUser = useLoadUser();

    const alertErrors = (errors) => {
        errors.forEach(error => {
            createAlert(error.msg, 'danger')
        })
    }

    const registerFailRemoveToken = () => {
        dispatch(REGISTER_FAIL());
        localStorage.removeItem('token')  
    }

    const registerAndSaveToken = (payload) => {
        dispatch(REGISTER_SUCCESS(payload));
        localStorage.setItem('token', payload.token)
    }

    const register = async ({name, email, password}) => {
        try {
            const res = await fetch(`/api/user`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },                
                body: JSON.stringify({ name, email, password })
            });
            const resJson = await res.json()

            if(resJson.errors) {
                alertErrors(resJson.errors);
                registerFailRemoveToken()
            } else {
                registerAndSaveToken(resJson);
                loadUser()
            }
        } catch (error) {
            registerFailRemoveToken()
            console.log(error);
            createAlert("Something went wrong, try again later.", 'danger')
        }
    }
    return register
}

export default useRegister;