import { useDispatch } from "react-redux";
import postSlice from "../../post/state/postSlice.js";
import fetcher from "../../../utils/fetcher.js";

const useLike = () => {

    const dispatch = useDispatch();
    const { UPDATE_LIKES, POST_ERROR } = postSlice.actions;

    const addLike = async (postId) => {
        try {
            const res = await fetcher(`/api/post/like/${postId}`, {
                method: 'PUT'
            })
            const resJson = await res.json();
            if(res.status !== 200) {
                dispatch(POST_ERROR({
                    msg: resJson.errors, 
                    status: res.status
                }))
            } else {
                dispatch(UPDATE_LIKES({postId, resJson}));            
            }
        } catch (error) {
            console.log(error);
            dispatch(POST_ERROR({
                msg: error.response.statusText, 
                status: error.response.status
            }))
        }
    }

    const removeLike = async (postId) => {
        console.log(postId)
        try {
            const res = await fetcher(`/api/post/unlike/${postId}`, {
                method: 'PUT'
            })
            const resJson = await res.json();
            if(res.status !== 200) {
                dispatch(POST_ERROR({
                    msg: resJson.errors, 
                    status: res.status
                }))
            } else {
                dispatch(UPDATE_LIKES({postId, resJson}));            
            }
        } catch (error) {
            console.log(error);
            dispatch(POST_ERROR({
                msg: error.response.statusText, 
                status: error.response.status
            }))
        }
    }

    return [ addLike, removeLike ];
}

export default useLike;