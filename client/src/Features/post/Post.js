import { Link } from 'react-router-dom';
import Spinner from '../Layout/Spinner.js';
import useFindPost from './hooks/useFindPost.js';
import PostItem from '../posts/PostItem.js';
import CommentForm from './CommentForm.js';

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
            </div>
        )
    }
}

export default Post;