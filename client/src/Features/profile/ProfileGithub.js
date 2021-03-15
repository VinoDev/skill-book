import Spinner from '../Layout/Spinner.js'
import useGithubRepos from './hooks/useGithubRepos.js';

const ProfileGithub = () => {

    const [ profile, repos, loading ] = useGithubRepos();

    if(loading || repos === null){
        return <Spinner />
    } else {
        return (
            <div className="profile-github">
                <h2 className="text-primary m-1">Github Repos</h2>
                {repos.map(repo => (
                    <div key={repo.id} className="repo bg-white p-1 my-1">
                        <div>
                            <h4>
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {repo.name}
                                </a>
                            </h4>
                            <p>
                                {repo.description}
                            </p>
                        </div>
                        <div>
                            <ul>
                                <li className="badge badge-primary">
                                    Stars: {repo.stargazers_count}
                                </li>
                                <li className="badge badge-dark">
                                    Watchers: {repo.watchers_count}
                                </li>
                                <li className="badge badge-light">
                                    Forks: {repo.forks_count}
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

}

export default ProfileGithub