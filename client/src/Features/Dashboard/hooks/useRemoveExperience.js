import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import profileSlice from "../../profile/state/profileSlice.js";
import useAlert from "../../alert/hooks/useAlert.js";
import fetcher from "../../../utils/fetcher.js";

const useRemoveExperience = () => {

    const history = useHistory();
    const createAlert = useAlert();
    const dispatch = useDispatch();
    const { REMOVE_EXPERIENCE, PROFILE_ERROR } = profileSlice.actions;

    const handleRemoveExperience = async (id) => {
        try {
            const res = await fetcher(`/api/profile/experience/${id}`, {
                method: 'PUT'         
            })
            const resJson = await res.json();
            if(res.status !== 200) {
                dispatch(PROFILE_ERROR({
                    msg: resJson.errors, 
                    status: res.status
                }))
            } else {
                dispatch(REMOVE_EXPERIENCE(resJson));   
                createAlert('Experience Removed', 'success')
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
  
    return [ handleRemoveExperience ];
}

export default useRemoveExperience;