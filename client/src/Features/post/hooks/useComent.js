import { useState } from "react";
import { useDispatch } from "react-redux";
import postSlice from "../state/postSlice.js";
import fetcher from "../../../utils/fetcher.js";
import useAlert from "../../Alert/hooks/useAlert.js"

const useComment = () => {

    const dispatch = useDispatch();
    const [ text, setText ] = useState('');
    const { ADD_COMMENT, COMMENT_ERROR } = postSlice.actions;
    const createAlert = useAlert();

    const addComment = async ({ postId }) => {

        try {
            const res = await fetcher(`/api/post/${postId}/comment`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            })
            const resJson = await res.json();
            if(res.status !== 200) {
                dispatch(COMMENT_ERROR({
                    msg: resJson.errors, 
                    status: res.status
                }))
            } else {
                dispatch(ADD_COMMENT(resJson));
                createAlert("Comment Added", 'success');            
            }
        } catch (error) {
            dispatch(COMMENT_ERROR({
                msg: error.response.statusText, 
                status: error.response.status
            }))
        }
    }

    return [ addComment, text, setText ];
}

export default useComment;