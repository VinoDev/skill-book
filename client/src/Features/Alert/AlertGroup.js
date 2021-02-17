import { useSelector } from "react-redux";
import Alert from './Alert.js';

const AlertGroup = () => {
    const { alerts } = useSelector((state) => state.alert);

    return (
        <div>
            {alerts.length > 0 && 
                alerts.map(alert => (
                    <Alert data={alert} key={alert.id}/>
                ))                
            }
        </div>
    )
}

export default AlertGroup;