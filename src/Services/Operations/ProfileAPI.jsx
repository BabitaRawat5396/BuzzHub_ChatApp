import { searchEndPoints } from "../api"
import { apiConnector } from "../apiConnector"
import { profileEndPoints } from "../api";
import { setUser } from "../../Slices/userSlice";

const {
  CHANGE_PROFILE_PICTURE_API
} = profileEndPoints;

const {
  SEARCH_API,
} = searchEndPoints;

export const search = async(value) => {
  let data =[];
  try {
    const response = await apiConnector("POST",SEARCH_API,value);
    
    if(!response.data.success){
      throw new Error(response.data.message);
    }

    data = response.data.users;
  } catch (error) {
    console.log("SEARCH_API ERROR",error);
  }

  return data;
}

export const changeProfilePicture = async(data,dispatch) => {
  let user;
  try {
    const response = await apiConnector("POST",CHANGE_PROFILE_PICTURE_API,data);

    if(!response.data.success){
      throw new Error(response.data.message);
    }
    // console.log("CHANGE_PROFILE_PICTURE_API RESPONSE",response);
    dispatch(setUser(response.data.data));
    localStorage.setItem("user", JSON.stringify(response.data.user))
    user = response.data.data;

  } catch (error) {
    console.log("CHANGE_PROFILE_PICTURE_API ERROR",error);
  }
  return user;
}

