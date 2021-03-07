import { useEffect } from 'react';
import useProfile from '../profile/useProfile.js';

const Dashboard = () => {        

    const getCurrentProfile = useProfile();

    useEffect(()=>{
        getCurrentProfile()   
    }, [])

    return <div>
        test
    </div>
}

export default Dashboard