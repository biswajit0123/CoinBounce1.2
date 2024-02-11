import { createSlice } from "@reduxjs/toolkit";

//define initial state ie-> users initial state

const initialStste = {
  _id: "",
  email: "",
  username: "",
  auth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialStste,
  reducers: {
    setUser: (state, action) => {
      //backend data will come from action.payload
      const { _id, email, username, auth } = action.payload;

      state._id = _id;
      state.email = email;
      state.username = username;
      state.auth = auth;
    },
    resetUser: (state) => {
        state._id = '';
        state.email = '';
        state.username = '';
        state.auth = false; 
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
