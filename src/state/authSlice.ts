import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  error: string | null;
  email: string;
  clearForm?: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  error: null,
  email: "",
  clearForm: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.error = null;
      state.email = action.payload;
      state.clearForm = false;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isAuthenticated = false;
      state.error = action.payload;
      state.email = "";
      state.clearForm = false;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.error = null;
      state.email = "";
      state.clearForm = true;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
