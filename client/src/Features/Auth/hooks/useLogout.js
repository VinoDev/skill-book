import { useDispatch, useSelector } from "react-redux";
import authSlice from "../state/authSlice.js";
import profileSlice from "../../profile/state/profileSlice.js";

const useLogout = () => {
  
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    const { LOGOUT } = authSlice.actions;
    const { CLEAR_PROFILE } = profileSlice.actions;

    const logoutUser = () => {
      dispatch(LOGOUT());
      dispatch(CLEAR_PROFILE());
      localStorage.removeItem('token');
      console.log("User logout");
    }
  
    return [ logoutUser, isAuthenticated, loading ];
}

export default useLogout;