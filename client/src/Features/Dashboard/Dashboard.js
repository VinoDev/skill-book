import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DashboardActions from './DashboardActions.js';
import Education from './Education.js'
import Experience from './Experience.js'
import DeleteAccount from './DeleteAccount.js'
import Profile from '../profile/Profile.js';
import useProfile from '../profile/useProfile.js';
import Spinner from '../Layout/Spinner.js';

const Dashboard = () => {        

    const [ profile, loading ] = useProfile();

    const { user } = useSelector((state) => state.auth);

    if(loading) {
        return <Spinner />
    } else {
        return (
            <div className="container">
                <h1 className="large text-primary">Dashboard</h1>
                <p className="lead">
                    <i className="fas fa-user"/>
                    <span>Welcome {user && user.name}</span>
                </p>
                {profile !== null ? (
                    <div>
                        <DashboardActions/>
                        <Experience experience={profile.experience}/>
                        <Education education={profile.education}/>
                        <DeleteAccount />
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