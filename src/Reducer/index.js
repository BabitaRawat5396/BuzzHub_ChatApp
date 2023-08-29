import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "../Slices/userSlice";
import authSlice from "../Slices/authSlice";


const rootReducer = combineReducers({
  auth: authSlice,
  profile: userSlice,
});

export default rootReducer;