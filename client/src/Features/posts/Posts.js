import usePost from './hooks/usePost.js'
import Spinner from '../layout/Spinner.js';
import PostItem from './PostItem.js';
import PostForm from './PostForm.js';

const Posts = () => {

    const [posts, loading] = usePost();

    if(loading){
        return <Spinner/>
    } else {
        return (
            <div className="container">
                <h1 className="large text-primary">Posts</h1>
                <p className="lead">
                    <i className="fas fa-user"/> Welcome to the community
                </p>
                <PostForm/>
                <div className="posts">
                    {
                        posts.map(post => {
                            if(post !== null){
                                return (
                                    <PostItem key={post._id} post={post} />
                                )
                            }
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Posts