import { useDispatch, useSelector } from "react-redux";
import profileSlice from "../state/profileSlice.js";
import fetcher from "../../../utils/fetcher.js";
import { useEffect } from "react";

const useFindProfile = (id) => {

    const { profile, loading } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const { GET_PROFILE, CLEAR_PROFILE, LOADING_DATA, PROFILE_ERROR } = profileSlice.actions;

    useEffect(()=>{
        getProfileById(id)
    },[])

    const getProfileById = async (userId) => {

        try {
            dispatch(LOADING_DATA())
            const res = await fetcher(`/api/profile/user/${userId}`)
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

export default useFindProfile;