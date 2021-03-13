import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import profileSlice from "../../state/profileSlice.js";
import useAlert from "../../../Alert/hooks/useAlert.js";
import fetcher from "../../../../utils/fetcher.js";

const useAddEducation = () => {

    const history = useHistory();
    const createAlert = useAlert();
    const dispatch = useDispatch();
    const { ADD_EDUCATION, PROFILE_ERROR } = profileSlice.actions;

    const [ formData, setFormData ] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const [ toDateDisbled, toggleDisabled ] = useState(false);
    
    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })

    const toggleCurrent = e => {
        setFormData({
            ...formData,
            current: !formData.current
        })
        toggleDisabled(!toDateDisbled);
    }

    const onSubmit = e => {
        e.preventDefault()
        addEducation(formData)
    }

    const addEducation = async (formData) => {
        try {
            const res = await fetcher('/api/profile/education', {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json'
                },                
                body: JSON.stringify(formData)
            })
            const resJson = await res.json();
            if(res.status !== 200) {
                dispatch(PROFILE_ERROR({
                    msg: resJson.errors, 
                    status: res.status
                }))
            } else {
                dispatch(ADD_EDUCATION(resJson));   
                createAlert('Education Added', 'success')
                history.push('/dashboard')         
            }
        } catch (error) {
            if(error.response.data.errors){
                error.forEach(err => {
                    createAlert(err.msg, 'danger');
                });
            }

            dispatch(PROFILE_ERROR({
                msg: error.response.statusText, 
                status: error.response.status
            }))
        }
    }
  
    return [ onSubmit, onChange, toggleCurrent, formData ];
}

export default useAddEducation;