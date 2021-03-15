import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import useLike from './hooks/useLike.js'

const PostItem = ({post}) => {

    const [ addLike, removeLike ] = useLike();
    const auth = useSelector((state) => state.auth);

    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <a href="profile.html">
                    <img
                        className="round-img"
                        src={post.avatar}
                        alt=""
                    />
                    <h4>{post.name}</h4>
                </a>
            </div>
            <div>
                <p className="my-1">
                    {post.text}
                </p>
                 <p className="post-date">
                    Posted on <Moment format="YYYY/MM/DD">{post.date}</Moment>
                </p>
                <button onClick={() => addLike(post._id)} type="button" className="btn btn-light">
                    <i className="fas fa-thumbs-up"></i>{' '}
                    {post.likes.length > 0 && (
                        <span>{post.likes.length}</span>
                    )}
                </button>
                <button onClick={() => removeLike(post._id)} type="button" className="btn btn-light">
                    <i className="fas fa-thumbs-down"></i>
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-primary">
                    Discussion{' '}
                    {post.comments.length > 0 && (
                        <span className='comment-count'>{post.comments.length}</span>
                    )}
                </Link>
                {!auth.loading && post.user === auth.user._id && (
                    <button      
                        type="button"
                        className="btn btn-danger"
                    >
                    <i className="fas fa-times"></i>
                    </button>
                )}
            </div>
        </div>
    )
}

export default PostItem