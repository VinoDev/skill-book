import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import profileSlice from "./state/profileSlice.js";
import useAlert from "../Alert/useAlert.js";
import fetcher from "../../utils/fetcher.js";

const useRemoveExperience = () => {

    const history = useHistory();
    const createAlert = useAlert();
    const dispatch = useDispatch();
    const { removeExperience, profileError } = profileSlice.actions;

    const handleRemoveExperience = async (id) => {
        try {
            const res = await fetcher(`/api/profile/experience/${id}`, {
                method: 'PUT'         
            })
            const resJson = await res.json();
            if(res.status !== 200) {
                dispatch(profileError({
                    msg: resJson.errors, 
                    status: res.status
                }))
            } else {
                dispatch(removeExperience(resJson));   
                createAlert('Experience Removed', 'success')
                history.push('/dashboard')         
            }
        } catch (error) {
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
  
    return [ handleRemoveExperience ];
}

export default useRemoveExperience;