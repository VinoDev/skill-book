import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../Layout/Spinner.js'
import useFindProfile from './hooks/useFindProfile.js'

const Profile = ({ match }) => {

    const [ profile, loading ] = useFindProfile(match.params.id)
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const isMyProfile = isAuthenticated && user._id === profile.user._id;

    if(loading || profile === null) {
        return <Spinner />
    } else {
        return (
            <div className="container">
                <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
                {
                    isMyProfile && (
                        <Link to="/edit-profile" className="btn btn-dark">
                            Edit Profile
                        </Link>
                    )
                }
            </div>
        )    
    }
}

export default Profile;