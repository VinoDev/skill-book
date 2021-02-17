import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import alertSlice from "./state/alertSlice.js";

const { setAlert, removeAlert } = alertSlice.actions;

const useAlert = () => {
    const dispatch = useDispatch();

    const createNewAlert = (msg, alertType) => {
        const id = uuidv4();
        const newAlert = { id, msg, alertType };
        dispatch(setAlert(newAlert));    
        setTimeout(() => dispatch(removeAlert(id)), 5000)    
    }
    return createNewAlert
}

export default useAlert;