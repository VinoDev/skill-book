import { useDispatch, useSelector } from "react-redux";
import profileSlice from "../../profile/state/profileSlice.js";
import fetcher from "../../../utils/fetcher.js";
import { useEffect } from "react";

const useAllProfile = () => {

    const { profiles, loading } = useSelector((state) => state.profile);

    useEffect(()=>{
        if(profiles.length === 0){
            getAllProfiles()
        }
    },[])

    const dispatch = useDispatch();

    const { GET_ALL_PROFILES, LOADING_DATA, PROFILE_ERROR } = profileSlice.actions;
    const getAllProfiles = async () => {
        try {
            dispatch(LOADING_DATA());
            const res = await fetcher('/api/profile')
            const resJson = await res.json();
            if(res.status !== 200) {
                dispatch(PROFILE_ERROR({
                    msg: resJson.errors, 
                    status: res.status
                }))
            } else {
                dispatch(GET_ALL_PROFILES(resJson));   
            }
        } catch (error) {
            dispatch(PROFILE_ERROR({
                msg: error.response.statusText, 
                status: error.response.status
            }))
        }
    }

    return [ profiles, loading ];
}

export default useAllProfile;