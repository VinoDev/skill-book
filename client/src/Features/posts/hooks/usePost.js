import { useDispatch, useSelector } from "react-redux";
import postSlice from "../../post/state/postSlice.js";
import fetcher from "../../../utils/fetcher.js";
import { useEffect } from "react";

const usePost = () => {

    const { posts, loading } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const { GET_POSTS, POST_ERROR, LOADING_POSTS } = postSlice.actions;

    useEffect(()=>{
        getPosts()
    },[])

    const getPosts = async () => {

        try {
            dispatch(LOADING_POSTS())
            const res = await fetcher(`/api/post`)
            const resJson = await res.json();
            if(res.status !== 200) {
                dispatch(POST_ERROR({
                    msg: resJson.errors, 
                    status: res.status
                }))
            } else {
                dispatch(GET_POSTS(resJson));            
            }
        } catch (error) {
            console.log(error);
            dispatch(POST_ERROR({
                msg: error.response.statusText, 
                status: error.response.status
            }))
        }
    }

    return [ posts, loading ];
}

export default usePost;