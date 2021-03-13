import { useDispatch, useSelector } from "react-redux";
import profileSlice from "./state/profileSlice.js";
import fetcher from "../../utils/fetcher.js";

const useAllProfile = () => {

    const dispatch = useDispatch();
    const { profile, loading } = useSelector((state) => state.profile);

    const { GET_ALL_PROFILES, CLEAR_PROFILE, PROFILE_ERROR } = profileSlice.actions;
    const getAllProfiles = async () => {

        dispatch(CLEAR_PROFILE());

        try {
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

    return [ getAllProfiles ];
}

export default useAllProfile;