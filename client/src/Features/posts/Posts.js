import usePost from './hooks/usePost.js'
import Spinner from '../Layout/Spinner.js';

const Posts = () => {

    const [posts, loading] = usePost();

    return (
        <div className="container">
            Test
        </div>
    )
}

export default Posts