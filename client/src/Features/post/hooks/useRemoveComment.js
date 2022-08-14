import { useDispatch } from "react-redux";
import postSlice from "../state/postSlice.js";
import fetcher from "../../../utils/fetcher.js";
import useAlert from "../../Alert/hooks/useAlert.js"

const useRemoveComment = () => {

    const dispatch = useDispatch();
    const { REMOVE_COMMENT, COMMENT_ERROR } = postSlice.actions;
    const createAlert = useAlert();

    const removeComment = async (postId, commentId) => {

        try {
            const res = await fetcher(`/api/post/${postId}/comment/${commentId}`, {
                method: "PUT"
            })
            const resJson = await res.json();
            if(res.status !== 200) {
                dispatch(COMMENT_ERROR({
                    msg: resJson.errors, 
                    status: res.status
                }))
            } else {
                dispatch(REMOVE_COMMENT(commentId));
                createAlert("Comment Removed");            
            }
        } catch (error) {
            dispatch(COMMENT_ERROR({
                msg: error.response.statusText, 
                status: error.response.status
            }))
        }
    }

    return removeComment
}

export default useRemoveComment;