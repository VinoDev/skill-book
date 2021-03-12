import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import profileSlice from "../profile/state/profileSlice.js";
import useAlert from "../Alert/useAlert.js";
import fetcher from "../../utils/fetcher.js";

const useDeleteAccount = () => {

    const history = useHistory();
    const createAlert = useAlert();
    const dispatch = useDispatch();
    const { clearProfile, deleteAccount, profileError } = profileSlice.actions;

    const [ formData, setFormData ] = useState({
        company: '',
        title: '',
        location: '',
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
        AddExperience(formData)
    }

    const DeleteAccount = async (id) => {

        if(window.confirm('Are you sure? This can NOT be undone!')){

            try {
                const res = await fetcher(`/api/profile`, {
                    method: 'DELETE'         
                })
                const resJson = await res.json();
                if(res.status !== 200) {
                    dispatch(profileError({
                        msg: resJson.errors, 
                        status: res.status
                    }))
                } else {
                    dispatch(clearProfile()); 
                    localStorage.removeItem('token')  
                    dispatch(deleteAccount());  
                    createAlert('Your account has been permanantly deleted')
                    history.push('/dashboard')         
                }
            } catch (error) {
                if(error.response.data.errors){
                    error.forEach(err => {
                        createAlert(err.msg, 'danger');
                    });
                }

                dispatch(profileError({
                    msg: error.response.statusText, 
                    status: error.response.status
                }))
            }
        }
    }
  
    return [ onSubmit, onChange, toggleCurrent, formData ];
}

export default useDeleteAccount;