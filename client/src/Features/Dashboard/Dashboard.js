import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useProfile from '../profile/useProfile.js';
import Spinner from '../Layout/Spinner.js';

const Dashboard = () => {        

    const [ profile, loading ] = useProfile();

    const { user } = useSelector((state) => state.auth);

    if(loading) {
        return <Spinner />
    } else {
        return (
            <div>
                <h1 className="large text-primary">Dashboard</h1>
                <p className="lead">
                    <i className="fas fa-user"/>
                    <span>Welcome {user && user.name}</span>
                </p>
                {profile !== null ? (
                    <div>
                        Profile will be shown here
                    </div>
                ) : (
                    <div>
                        <p>You have not yet setup a profile, please create your profile</p>
                        <Link to='/create-profile' className='btn btn-primary my-1'>
                            Create Profile
                        </Link>
                    </div>
                )}
            </div>
        )
    }
}

export default Dashboard