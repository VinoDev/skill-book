import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import profileSlice from "../state/profileSlice.js";
import fetcher from "../../../utils/fetcher.js";

const useProfile = () => {

    const { profile, loading } = useSelector((state) => state.profile);

    useEffect(()=>{
        if(!profile){
            getCurrentProfile()   
        }
    }, [profile])

    const dispatch = useDispatch();
    const { GET_PROFILE, PROFILE_ERROR, LOADING_DATA } = profileSlice.actions;

    const getCurrentProfile = async () => {
        try {
            dispatch(LOADING_DATA());
            const res = await fetcher('/api/profile/me')
            const resJson = await res.json();
            if(res.status !== 200) {
                dispatch(PROFILE_ERROR({
                    msg: resJson.errors, 
                    status: res.status
                }))
            } else {
                dispatch(GET_PROFILE(resJson));            
            }
        } catch (error) {
            dispatch(PROFILE_ERROR({
                msg: error.response.statusText, 
                status: error.response.status
            }))
        }
    }
  
    return [ profile, loading ];
}

export default useProfile;