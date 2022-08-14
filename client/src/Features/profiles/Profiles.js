import Spinner from '../Layout/Spinner.js';
import useAllProfiles from './hooks/useAllProfiles.js';
import ProfileItem from './ProfileItem.js'

const Profiles = () => {
    
    const [ profiles, loading ] = useAllProfiles();

    const renderProfiles = (profiles) => (
        profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile}/>
        ))
    )

    if(loading) {
        return <Spinner/>
    } else {
        return (
            <div className="container">
                <h1 className="large text-primary">Professionals</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop"></i> Browse and connect with proffesionals!
                </p>
                <div className="profiles">
                    {profiles.length > 0 ? renderProfiles(profiles) : <h4>No profiles found...</h4>}
                </div>
            </div>
        )
    }
}

export default Profiles