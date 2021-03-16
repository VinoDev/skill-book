import { useDispatch, useSelector } from "react-redux";
import postSlice from "../state/postSlice.js";
import fetcher from "../../../utils/fetcher.js";
import { useEffect } from "react";

const useFindPost = (id) => {

    const { post, loading } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const { GET_POST, POST_ERROR, LOADING_POST } = postSlice.actions;

    useEffect(()=>{
        getPost(id)
    },[])

    const getPost = async (id) => {

        try {
            dispatch(LOADING_POST())
            const res = await fetcher(`/api/post/${id}`)
            const resJson = await res.json();
            if(res.status !== 200) {
                dispatch(POST_ERROR({
                    msg: resJson.errors, 
                    status: res.status
                }))
            } else {
                dispatch(GET_POST(resJson));            
            }
        } catch (error) {
            dispatch(POST_ERROR({
                msg: error.response.statusText, 
                status: error.response.status
            }))
        }
    }

    return [ post, loading ];
}

export default useFindPost;