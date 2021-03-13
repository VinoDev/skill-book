import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../Layout/Spinner.js'
import useFindProfile from './hooks/useFindProfile.js'
import ProfileTop from './ProfileTop.js'
import ProfileAbout from './ProfileAbout.js';

const Profile = ({ match }) => {

    const [ profile, loading ] = useFindProfile(match.params.id)
    const auth = useSelector((state) => state.auth);

    if(loading || profile === null) {
        return <Spinner />
    } else {
        return (
            <div className="container">
                <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
                {
                    auth.isAuthenticated && !auth.loading && auth.user._id === profile.user._id && (
                        <Link to="/edit-profile" className="btn btn-dark">
                            Edit Profile
                        </Link>
                    )
                }
                <div className="profile-grid my-1">
                    <ProfileTop profile={profile}/>
                    <ProfileAbout profile={profile}/>
                </div>
            </div>
        )    
    }
}

export default Profile;