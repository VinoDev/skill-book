import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner.js';
import useFindPost from './hooks/useFindPost.js';
import PostItem from '../posts/PostItem.js';
import CommentForm from './CommentForm.js';
import CommentItem from "./CommentItem.js";

const Post = ({ match }) => {
    const [ post, loading ] = useFindPost(match.params.id);


    if(loading || post === null) {
        return <Spinner/>
    } else {
        return (
            <div className="container">
                <Link to="/posts" className="btn">Back To Posts</Link>
                <PostItem post={post} showActions={false}/>
                <CommentForm postId={post._id}/>
                <div className="comments">
                {
                    post.comments.map(comment => (
                        <CommentItem key={comment._id} comment={comment} postId={post._id} />
                    ))
                }
                </div>
            </div>
        )
    }
}

export default Post;