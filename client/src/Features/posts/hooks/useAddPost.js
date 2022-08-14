import { useDispatch, useSelector } from "react-redux";
import postSlice from "../../post/state/postSlice.js";
import fetcher from "../../../utils/fetcher.js";
import { useState } from "react";
import useAlert from "../../Alert/hooks/useAlert.js";

const usePost = () => {

    const [ text, setText ] = useState('');
    const createAlert = useAlert();
    const dispatch = useDispatch();
    const { POST_ERROR, ADD_POST, LOADING_POSTS } = postSlice.actions;

    const addPost = async () => {

        try {
            const res = await fetcher(`/api/post`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },                
                body: JSON.stringify({ text })
            })
            const resJson = await res.json();
            if(res.status !== 200) {
                dispatch(POST_ERROR({
                    msg: resJson.errors, 
                    status: res.status
                }))
            } else {
                dispatch(ADD_POST(resJson));      
                createAlert("Post Created", 'success');
            }
        } catch (error) {
            dispatch(POST_ERROR({
                msg: error.response.statusText, 
                status: error.response.status
            }))
        }
    }

    return [ addPost, text, setText ];
}

export default usePost;