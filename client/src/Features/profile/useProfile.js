import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import profileSlice from "./state/profileSlice.js";
import fetcher from "../../utils/fetcher.js";

const useProfile = () => {

    useEffect(()=>{
        getCurrentProfile()   
    }, [])

    const dispatch = useDispatch();
    const { getProfile, profileError } = profileSlice.actions;
    const { profile, loading } = useSelector((state) => state.profile);

    const getCurrentProfile = async () => {
        try {
            const res = await fetcher('/api/profile/me')
            const resJson = await res.json();
            if(res.status !== 200) {
                dispatch(profileError({
                    msg: resJson.errors, 
                    status: res.status
                }))
            } else {
                dispatch(getProfile(resJson));            
            }
        } catch (error) {
            dispatch(profileError({
                msg: error.response.statusText, 
                status: error.response.status
            }))
        }
    }
  
    return [ profile, loading ];
}

export default useProfile;