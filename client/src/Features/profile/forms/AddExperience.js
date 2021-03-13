import { Link } from "react-router-dom";
import useAddExperience from "./hooks/useAddExperience.js";

const AddExperience = () => {

    const [ onSubmit, onChange, toggleCurrent, formData ] = useAddExperience();

    const {
        company,
        title,
        location,
        from,
        to,
        current,
        description
    } = formData;

    return (
        <div className="container">
            <h1 className="large text-primary">
                Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="* Job Title" 
                        name="title" 
                        required 
                        value={title}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="* Company" 
                        name="company" 
                        required 
                        value={company}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Location" 
                        name="location" 
                        value={location}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} required onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                    <p>
                        <input 
                            type="checkbox" 
                            name="current" 
                            value={current}
                            checked={current}
                            onChange={e => toggleCurrent(e)}
                        /> 
                        {' '}Current Job
                    </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={current}/>
                </div>
                <div className="form-group">
                    <textarea
                      name="description"
                      cols="30"
                      rows="5"
                      placeholder="Job Description"
                      value={description}
                      onChange={e => onChange(e)}
                    >
                    </textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>        
        </div>
    )

}

export default AddExperience