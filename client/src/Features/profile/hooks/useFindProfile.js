import { useDispatch, useSelector } from "react-redux";
import profileSlice from "../state/profileSlice.js";
import fetcher from "../../../utils/fetcher.js";

const useFindProfile = () => {

    const dispatch = useDispatch();
    const { profile, loading } = useSelector((state) => state.profile);

    const { GET_PROFILE, CLEAR_PROFILE, PROFILE_ERROR } = profileSlice.actions;
    const getProfileById = async (userId) => {

        try {
            const res = await fetcher(`/api/profile/${userId}`)
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

    return [ getProfileById ];
}

export default useFindProfile;