import useDeleteAccount from '../Auth/useDeleteAccount.js';

const DeleteAccount = () => {
    const [ handleDeleteAccount ] = useDeleteAccount()
    
    return (
        <div className="my-2">
            <button className="btn btn-danger" onClick={() => handleDeleteAccount()}>
                <i className="fas fa-user-minus"></i> Delete My Account
            </button>
        </div>
    )
}

export default DeleteAccount