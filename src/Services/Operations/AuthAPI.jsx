
import { setUser } from "../../Slices/userSlice";
import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";
import { authEndPoints } from "../api";

const {
  SIGNIN_API,
  SIGNUP_API,
} = authEndPoints;


export function signUp(data) {
  return async () => {
    // dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API,data);

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
    }
    // dispatch(setLoading(false));
  }
}

export function logIn(data) {
  return async (dispatch) => {
    // dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNIN_API,data);

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setUser(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))

      toast.success("Login Successful");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("LOGIN Failed");
    }
    // dispatch(setLoading(false));
  }
}