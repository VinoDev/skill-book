import { useDispatch } from "react-redux";
import authSlice from "./state/authSlice.js";
import useAlert from "../Alert/useAlert.js";

const { registerSuccess, registerFail } = authSlice.actions;

const useRegister = () => {
    const dispatch = useDispatch();
    const createAlert = useAlert();

    const register = async ({name, email, password}) => {
        try {
            const res = await fetch('http://localhost:5000/api/user', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },                
                body: JSON.stringify({ name, email, password })
            });
            const resJson = await res.json()

            if(resJson.errors) {
                resJson.errors.forEach(error => {
                    createAlert(error.msg, 'danger')
                })

                dispatch(registerFail());       
            } else {
                dispatch(registerSuccess(resJson));       
            }
        } catch (error) {

            dispatch(registerFail());       
            console.log(error);
            createAlert("Something went wrong, try again later.", 'danger')

        }
    }
    return register
}

export default useRegister;