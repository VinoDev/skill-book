import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../Layout/Spinner.js'
import useFindProfile from './hooks/useFindProfile.js'
import ProfileTop from './ProfileTop.js'
import ProfileAbout from './ProfileAbout.js';
import ProfileExperience from './ProfileExperience.js'
import ProfileEducation from './ProfileEducation.js'
import ProfileGithub from './ProfileGithub.js';

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
                    <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary">Experience</h2>
                        {
                            profile.experience.length > 0 ? (
                                <div>
                                    {
                                        profile.experience.map(experience => (
                                            <ProfileExperience 
                                                key={experience._id}
                                                experience={experience}
                                            />
                                        ))
                                    }
                                </div>
                            ) : (
                                <h4>
                                    No experience credentials
                                </h4>
                            )
                        }
                    </div>

                    <div className="profile-edu bg-white p-2">
                        <h2 className="text-primary">Education</h2>
                        {
                            profile.education.length > 0 ? (
                                <div>
                                    {
                                        profile.education.map(edu => (
                                            <ProfileEducation
                                                key={edu._id}
                                                education={edu}
                                            />
                                        ))
                                    }
                                </div>
                            ) : (
                                <h4>
                                    No education credentials
                                </h4>
                            )
                        }
                    </div>

                    {profile.githubusername && (
                        <ProfileGithub/>
                    )}
                </div>  
            </div>
        )    
    }
}

export default Profile;