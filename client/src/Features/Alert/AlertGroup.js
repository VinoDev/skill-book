import { useSelector } from "react-redux";
import Alert from './Alert.js';

const AlertGroup = () => {
    const { alerts } = useSelector((state) => state.alert);

    return (
        <div>
            {alerts.length > 0 && 
                <div className="container">
                    {alerts.map(alert => (
                        <Alert data={alert} key={alert.id}/>
                    ))}   
                </div>             
            }
        </div>
    )
}

export default AlertGroup;