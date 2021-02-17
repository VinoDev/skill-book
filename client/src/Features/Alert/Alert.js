const Alert = ({data}) => {
    return (
        <div key={data.id} className={`alert alert-${data.alertType}`}>
            {data.msg}
        </div>
    )
}

export default Alert;