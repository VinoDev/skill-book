import Moment from 'react-moment';
import useRemoveExperience from '../profile/useRemoveExperience.js'

const Experience = ({ experience }) => {

    const [ handleRemoveExperience ] = useRemoveExperience();

    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.form}</Moment> - {
                    exp.to === null ? (' Now') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)
                }
            </td>
            <td>
                <button onClick={() => handleRemoveExperience(exp._id)} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ))

    return (
        <div>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>
        </div>
    )
}

export default Experience