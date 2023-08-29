import { messageEndPoints } from "../api";
import { apiConnector } from "../apiConnector";

const {
  ADD_MESSAGE_API,
  GET_ALL_MESSAGES_API
} = messageEndPoints;

export const addMessage = async(data,token) => {
  let dataArray=[];
  try {
    const response = await apiConnector("POST",ADD_MESSAGE_API,data,{
      Authorization:`Bearer ${token}`
    });

    if(!response.data.success){
      throw new Error(response.data.message);
    }
    // console.log("ADD_MESSAGE_API RESPONSE",response);
    dataArray = response.data.data;

  } catch (error) {
    console.log("ADD_MESSAGE_API ERROR",error);
  }

  return dataArray;
}

export const getAllMessages = async(value) => {
  let data=[];
  try {
    const response = await apiConnector("POST",GET_ALL_MESSAGES_API,value);

    if(!response.data.success){
      throw new Error(response.data.message);
    }

    data = response.data.data;
  } catch (error) {
    console.log("GET_ALL_MESSAGES_API ERROR",error);
  }
  return data;
}

