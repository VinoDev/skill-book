import { useDispatch, useSelector } from "react-redux";
import authSlice from "./state/authSlice.js";

const useLogout = () => {
  
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    const { logout } = authSlice.actions;

    const logoutUser = () => {
      dispatch(logout());
      localStorage.removeItem('token')  
      console.log("User logout");
    }
  
    return [ logoutUser, isAuthenticated, loading ];
}

export default useLogout;