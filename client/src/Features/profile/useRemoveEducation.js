import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import profileSlice from "./state/profileSlice.js";
import useAlert from "../Alert/useAlert.js";
import fetcher from "../../utils/fetcher.js";

const useRemoveEducation = () => {

    const history = useHistory();
    const createAlert = useAlert();
    const dispatch = useDispatch();
    const { REMOVE_EDUCATION, PROFILE_ERROR } = profileSlice.actions;

    const handleRemoveEducation = async (id) => {
        try {
            const res = await fetcher(`/api/profile/education/${id}`, {
                method: 'PUT'         
            })
            const resJson = await res.json();
            if(res.status !== 200) {
                dispatch(PROFILE_ERROR({
                    msg: resJson.errors, 
                    status: res.status
                }))
            } else {
                dispatch(REMOVE_EDUCATION(resJson));   
                createAlert('Education Removed', 'success')
                history.push('/dashboard')         
            }
        } catch (error) {
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
  
    return [ handleRemoveEducation ];
}

export default useRemoveEducation;