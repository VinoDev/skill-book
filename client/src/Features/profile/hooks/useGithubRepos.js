import { useDispatch, useSelector } from "react-redux";
import profileSlice from "../state/profileSlice.js";
import fetcher from "../../../utils/fetcher.js";

const useGithubRepos = () => {

    const dispatch = useDispatch();
    const { profile, loading } = useSelector((state) => state.profile);

    const { GET_REPOS, CLEAR_PROFILE, PROFILE_ERROR } = profileSlice.actions;
    const getGithubRepos = async (username) => {

        try {
            const res = await fetcher(`/api/profile/github/${username}`)
            const resJson = await res.json();
            if(res.status !== 200) {
                dispatch(PROFILE_ERROR({
                    msg: resJson.errors, 
                    status: res.status
                }))
            } else {
                dispatch(GET_REPOS(resJson));            
            }
        } catch (error) {
            dispatch(PROFILE_ERROR({
                msg: error.response.statusText, 
                status: error.response.status
            }))
        }
    }

    return [ getGithubRepos ];
}

export default useGithubRepos;