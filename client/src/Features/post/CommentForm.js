import useComment from './hooks/useComent.js'

const CommentForm = (postId) => {

    const [ addComment, text, setText ] = useComment();

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Leave a Comment</h3>
            </div>
            <form className="form my-1" 
                onSubmit={
                    e => {
                        e.preventDefault();
                        addComment(postId);
                        setText('')
                    }
            }>
                <textarea
                  name="text"
                  cols="30"
                  rows="5"
                  placeholder="Create a post"
                  value={text}
                  onChange={e => setText(e.target.value)}
                  required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

export default CommentForm;