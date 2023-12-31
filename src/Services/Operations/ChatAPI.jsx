
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
  DELETE_CHAT_API,
  UPDATE_GROUP_PROFILE_API
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

export const deleteChat = async(data,token) => {
  let user = [];
  try {
    const response = await apiConnector("POST",DELETE_CHAT_API,data,{
      Authorization:`Bearer ${token}`
    });

    if(!response.data.success){
      throw new Error(response.data.message);
    }
    user = response.data.data;
    console.log("DELETE_CHAT_API RESPONSE",response);

  } catch (error) {
    console.log("DELETE_CHAT_API ERROR",error);
  }
  return user;
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

    console.log("FETCH_USER_ALL_CHATS_API RESPONSE",response);
    users = response.data.data;

  } catch (error) {
    console.log("FETCH_USER_ALL_CHATS_API ERROR",error);
    
  }
  return users;
}

export const createGroupChat = async(data,token) => {
  let user;
  try {
    const response = await apiConnector("POST",CREATE_GROUP_CHAT_API,data,{
      Authorization:`Bearer ${token}`
    });

    if(!response.data.success){
      throw new Error(response.data.message);
    }
    console.log("CREATE_GROUP_CHAT_API RESPONSE",response);
    user = response.data.data;
  } catch (error) {
    console.log("CREATE_GROUP_CHAT_API ERROR",error);
    toast.error(error.response.data.message)
  }

  return user;
}

export const renameGroup = async(data,token) => {
  let user;
  try {
    const response = await apiConnector("PUT",RENAME_GROUP_API,data,{
      Authorization:`Bearer ${token}`
    })

    // console.log("RENAME_GROUP_API RESPONSE",response);

    if(!response.data.success){
      throw new Error(response.data.message);
    }

    user = response.data.data;
  } catch (error) {
    console.log("RENAME_GROUP_API ERROR",error);
  }

  return user;
}

export const updateGroupProfile = async(data,token) => {
  let user=[];
  try {
    const response = await apiConnector("POST",UPDATE_GROUP_PROFILE_API,data,{
      Authorization:`Bearer ${token}`
    })
    
    if(!response.data.success){
      throw new Error(response.data.message)
    }
    console.log("UPDATE_GROUP_PROFILE_API RESPONSE",response);
    user = response.data.data;
  } catch (error) {
    console.log("UPDATE_GROUP_PROFILE_API ERROR",error)
  }

  return user;
}

export const addToGroup = async(data,token) => {
  let user;
  try {
    const response = await apiConnector("PUT",ADD_TO_GROUP_API,data,{
      Authorization:`Bearer ${token}`
    })

    if(!response.data.success){
      throw new Error(response.data.message)
    }

    console.log("ADD_TO_GROUP_API RESPONSE",response);
    user = response.data.data;
  } catch (error) {
    console.log("ADD_TO_GROUP_API ERROR",error);
  }

  return user;
}

export const removeFromGroup = async(data,token) => {
  let user;
  try {
    const response = await apiConnector("PUT",REMOVE_FROM_GROUP_API,data,{
      Authorization:`Bearer ${token}`
    })

    if(!response.data.success){
      throw new Error(response.data.message)
    }

    console.log("REMOVE_FROM_GROUP_API RESPONSE",response);
    user = response.data.data;
  } catch (error) {
    console.log("REMOVE_FROM_GROUP_API ERROR",error);
  }

  return user;
}
