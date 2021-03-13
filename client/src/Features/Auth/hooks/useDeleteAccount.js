import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import profileSlice from "../../profile/state/profileSlice.js";
import authSlice from "../state/authSlice.js";
import useAlert from "../../Alert/hooks/useAlert.js";
import fetcher from "../../../utils/fetcher.js";

const useDeleteAccount = () => {

    const history = useHistory();
    const createAlert = useAlert();
    const dispatch = useDispatch();
    const { CLEAR_PROFILE, PROFILE_ERROR } = profileSlice.actions;
    const { DELETE_ACCOUNT } = authSlice.actions;

    const handleDeleteAccount = async () => {

        if(window.confirm('Are you sure? This can NOT be undone!')){

            try {
                const res = await fetcher(`/api/user`, {
                    method: 'DELETE'         
                })
                console.log(res);
                const resJson = await res.json();
                console.log(resJson);
                if(res.status !== 200) {
                    dispatch(PROFILE_ERROR({
                        msg: resJson.errors, 
                        status: res.status
                    }))
                } else {
                    dispatch(CLEAR_PROFILE()); 
                    dispatch(DELETE_ACCOUNT());  
                    localStorage.removeItem('token')  
                    createAlert('Your account has been permanantly deleted')
                    history.push('/login')         
                }
            } catch (error) {
                console.log(error);
                if(error.response.data.errors){
                    error.forEach(err => {
                        createAlert(err.msg, 'danger');
                    });
                }

                dispatch(PROFILE_ERROR({
                    msg: error.response.statusText, 
                    status: error.response.status
                }))
            }
        }
    }
  
    return [ handleDeleteAccount ];
}

export default useDeleteAccount;