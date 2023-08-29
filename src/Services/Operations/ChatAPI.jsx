
import { toast } from "react-hot-toast";
import { chatEndPoints } from "../api";
import { apiConnector } from "../apiConnector";

const {
  ACCESS_CHAT_API,
  FETCH_USER_ALL_CHATS_API,
  CREATE_GROUP_CHAT_API,
  RENAME_GROUP_API,
  ADD_TO_GROUP_API,
  REMOVE_FROM_GROUP_API,
  DELETE_CHAT_API
} = chatEndPoints;

export const accessChat = async(userId,token) => {
  let data = [];
  try {
    const response = await apiConnector("post",ACCESS_CHAT_API,userId,{
      Authorization:`Bearer ${token}`
    });

    if(!response.data.success){
      throw new Error(response.data.message);
    }
    console.log("ACCESS_CHAT_API RESPONSE",response);

    data = response.data.data;
  } catch (error) {
    console.log("ACCESS_CHAT_API ERROR",error);
  }
  return data;
}

export const deleteChat = async(userId,token) => {
  let data = [];
  try {
    const response = await apiConnector("POST",DELETE_CHAT_API,userId,{
      Authorization:`Bearer ${token}`
    });

    if(!response.data.success){
      throw new Error(response.data.message);
    }
    data = response.data.data;
    console.log("DELETE_CHAT_API RESPONSE",response);

  } catch (error) {
    console.log("DELETE_CHAT_API ERROR",error);
  }
  return data;
}

export const fetchUsersAllChats = async(token) => {
  let users = [];
  try {
    const response = await apiConnector("GET",FETCH_USER_ALL_CHATS_API,null,{
      Authorization:`Bearer ${token}`
    })

    if(!response.data.success){
      throw new Error(response.data.message);
    }

    // console.log("FETCH_USER_ALL_CHATS_API RESPONSE",response);
    users = response.data.data;

  } catch (error) {
    console.log("FETCH_USER_ALL_CHATS_API ERROR",error);
    
  }
  return users;
}

export function createGroupChat(data,token){
  return async() => {
    try {
      const response = await apiConnector("POST",CREATE_GROUP_CHAT_API,data,{
        Authorization:`Bearer ${token}`
      });

      if(!response.data.success){
        throw new Error(response.data.message);
      }
      console.log("CREATE_GROUP_CHAT_API RESPONSE",response);

    } catch (error) {
      console.log("CREATE_GROUP_CHAT_API ERROR",error);
      toast.error(error.response.data.message)
      
    }
  }
}