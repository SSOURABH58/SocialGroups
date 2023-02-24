import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {login, signup} from './../utils/auth';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({email, password}: {email: string; password: string}, thunkAPI) => {
    try {
      const user = await login(email, password);
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (
    {
      email,
      password,
      displayName,
    }: {email: string; password: string; displayName: string},
    thunkAPI,
  ) => {
    try {
      const user = await signup(email, password, displayName);
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

interface AuthState {
  currentUser: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<FirebaseAuthTypes.User>) {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    signupStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    signupSuccess(state, action: PayloadAction<FirebaseAuthTypes.User>) {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    signupFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.currentUser = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
