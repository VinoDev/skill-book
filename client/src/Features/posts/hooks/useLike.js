import { useDispatch } from "react-redux";
import postSlice from "../../post/state/postSlice.js";
import fetcher from "../../../utils/fetcher.js";
import useAlert from "../../Alert/hooks/useAlert.js";

const useLike = () => {

    const createAlert = useAlert();
    const dispatch = useDispatch();
    const { UPDATE_LIKES, POST_ERROR, DELETE_POST } = postSlice.actions;

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

    const deletePost = async (postId) => {

        try {
            const res = await fetcher(`/api/post/${postId}`, {
                method: 'DELETE'
            })
            const resJson = await res.json();
            if(res.status !== 200) {
                dispatch(POST_ERROR({
                    msg: resJson.errors, 
                    status: res.status
                }))
            } else {
                dispatch(DELETE_POST({postId, resJson}));      
                createAlert('Post Removed', 'success');      
            }
        } catch (error) {
            console.log(error);
            createAlert('Something went wrong...', 'danger');
            dispatch(POST_ERROR({
                msg: error.response.statusText, 
                status: error.response.status
            }))
        }
    }

    return [ addLike, removeLike, deletePost ];
}

export default useLike;