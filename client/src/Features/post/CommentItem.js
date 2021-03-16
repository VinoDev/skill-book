import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import useRemoveComment from './hooks/useRemoveComment.js'

const CommentItem = ({postId, comment}) => {

    const removeComment = useRemoveComment();
    const auth = useSelector((state) => state.auth);

    return (
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${comment.user}`}>
              <img
                className="round-img"
                src={comment.avatar}
                alt=""
              />
              <h4>{comment.name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
                {comment.text}
            </p>
             <p className="post-date">
                Posted on <Moment format="YYYY/MM/DD">{comment.date}</Moment>
            </p>
            {!auth.loading && comment.user === auth.user._id && (
                <button 
                    onClick={e => removeComment(postId, comment._id)}
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

export default CommentItem