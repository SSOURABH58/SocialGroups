import {profile} from './../types/User';
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

type user = {
  profile?: profile;
  uid?: string;
};

interface AuthState {
  user: user | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
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
      state.user = action.payload;
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
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    signupFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload;
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
