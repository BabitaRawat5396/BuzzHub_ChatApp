import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  showUserChat: null,
  notification: [],
  showSideBar:true,
  refreshSideBar:null,
  showContactInfo:false,
}

const userSlice = createSlice({
  name:"profile",
  initialState:initialState,
  reducers:{
    setUser(state,value){
      state.user = value.payload;
    },
    setShowUserChat(state,value){
      state.showUserChat = value.payload;
    },
    setNotification(state,value){
      state.notification = value.payload;
    },
    setShowSideBar(state,value){
      state.showSideBar = value.payload;
    },
    setRefreshSideBar(state,value){
      state.refreshSideBar = value.payload;
    },
    setShowContactInfo(state,value){
      state.showContactInfo = value.payload;
    }
  }
});


export const { setUser, setShowContactInfo, setShowUserChat, setNotification, setShowSideBar, setRefreshSideBar } = userSlice.actions;

export default userSlice.reducer;

