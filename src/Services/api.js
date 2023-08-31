const BASE_URL = process.env.REACT_APP_BASE_URL;

export const authEndPoints = {
  SIGNUP_API : BASE_URL + "/auth/signup",
  SIGNIN_API : BASE_URL + "/auth/signin",
}

export const searchEndPoints = {
  SEARCH_API : BASE_URL + "/search",
}

export const profileEndPoints = {
  CHANGE_PROFILE_PICTURE_API: BASE_URL + "/profile/changeProfilePicture"
}

export const messageEndPoints = {
  ADD_MESSAGE_API : BASE_URL + "/message/addMessage",
  GET_ALL_MESSAGES_API : BASE_URL + "/message/getAllMessages"

}

export const chatEndPoints = {
  ACCESS_CHAT_API : BASE_URL + "/chat/accessChat",
  DELETE_CHAT_API : BASE_URL + "/chat/deleteChat",
  FETCH_USER_ALL_CHATS_API : BASE_URL + "/chat/fetchUserAllChats",
  CREATE_GROUP_CHAT_API : BASE_URL + "/chat/createGroupChat",
  RENAME_GROUP_API : BASE_URL + "/chat/renameGroup",
  ADD_TO_GROUP_API : BASE_URL + "/chat/addTogroup",
  REMOVE_FROM_GROUP_API : BASE_URL + "/chat/removeFromGroup",
  UPDATE_GROUP_PROFILE_API : BASE_URL + "/chat/updateGroupProfile",
}