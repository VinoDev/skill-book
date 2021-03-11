import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import profileSlice from "./state/profileSlice.js";
import useAlert from "../Alert/useAlert.js";
import fetcher from "../../utils/fetcher.js";

const useCreateProfile = () => {

    const history = useHistory();
    const createAlert = useAlert();
    const dispatch = useDispatch();
    const { getProfile, profileError } = profileSlice.actions;
    const { profile, loading } = useSelector((state) => state.profile);

    const createProfile = async (formData) => {
        try {
            const res = await fetcher('/api/profile', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },                
                body: JSON.stringify(formData)
            })
            const resJson = await res.json();
            if(res.status !== 200) {
                dispatch(profileError({
                    msg: resJson.errors, 
                    status: res.status
                }))
            } else {
                dispatch(getProfile(resJson));   
                createAlert('Profile Created', 'success')
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
  
    return [ createProfile, profile, loading ];
}

export default useCreateProfile;