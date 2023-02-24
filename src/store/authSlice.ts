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
    updateProfile(state, action: PayloadAction<profile>) {
      state.user = {...state.user, profile: action.payload};
    },
    updateUserId(state, action: PayloadAction<string>) {
      state.user = {...state.user, uid: action.payload};
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

export const {updateProfile, updateUserId, logout} = authSlice.actions;

export default authSlice.reducer;
