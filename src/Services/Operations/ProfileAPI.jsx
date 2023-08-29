import { searchEndPoints } from "../api"
import { apiConnector } from "../apiConnector"
import { profileEndPoints } from "../api";

const {
  GET_PROFILES_API
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


export const getProfiles = async() => {
  let data=[];
  try {
    const response = await apiConnector("POST",GET_PROFILES_API);

    if(!response.data.success){
      throw new Error(response.data.message);
    }
    console.log("GET_PROFILES_API RESPONSE",response);
    data = response.data.response;

  } catch (error) {
    console.log("GET_PROFILES_API ERROR",error);
  }
  return data;
}
