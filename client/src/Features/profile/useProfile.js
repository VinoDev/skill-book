import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import profileSlice from "./state/profileSlice.js";
import fetcher from "../../utils/fetcher.js";

const useProfile = () => {

    const dispatch = useDispatch();
    const { getProfile, profileError } = profileSlice.actions;

    const getCurrentProfile = async () => {
        try {
            const res = await fetcher('/api/profile/me')
            const resJson = await res.json();
            dispatch(getProfile(resJson));            
        } catch (error) {
            dispatch(profileError({
                msg: error.response.statusText, 
                status: error.response.status
            }))
        }
    }
  
    return getCurrentProfile;
}

export default useProfile;