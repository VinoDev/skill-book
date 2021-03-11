import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import profileSlice from "./state/profileSlice.js";
import useAlert from "../Alert/useAlert.js";
import fetcher from "../../utils/fetcher.js";

const useEditProfile = (formData) => {

    useEffect(()=>{
        editProfile(formData)   
    }, [])

    const history = useHistory();
    const createAlert = useAlert();
    const dispatch = useDispatch();
    const { getProfile, profileError } = profileSlice.actions;
    const { profile, loading } = useSelector((state) => state.profile);

    const editProfile = async (formData, history) => {
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
                createAlert('Profile Updated', 'success')
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
  
    return [ profile, loading ];
}

export default useEditProfile;