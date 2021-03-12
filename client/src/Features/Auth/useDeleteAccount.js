import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import profileSlice from "../profile/state/profileSlice.js";
import authSlice from "./state/authSlice.js";
import useAlert from "../Alert/useAlert.js";
import fetcher from "../../utils/fetcher.js";

const useDeleteAccount = () => {

    const history = useHistory();
    const createAlert = useAlert();
    const dispatch = useDispatch();
    const { clearProfile, profileError } = profileSlice.actions;
    const { deleteAccount } = authSlice.actions;

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
                    dispatch(profileError({
                        msg: resJson.errors, 
                        status: res.status
                    }))
                } else {
                    dispatch(clearProfile()); 
                    dispatch(deleteAccount());  
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

                dispatch(profileError({
                    msg: error.response.statusText, 
                    status: error.response.status
                }))
            }
        }
    }
  
    return [ handleDeleteAccount ];
}

export default useDeleteAccount;