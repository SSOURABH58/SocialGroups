import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AppState {
  currentGroupID: string | null;
}

const initialState: AppState = {
  currentGroupID: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentGroupID: (state, action: PayloadAction<string>) => {
      state.currentGroupID = action.payload;
    },
    clearCurrentGroupID: state => {
      state.currentGroupID = null;
    },
  },
});

export const {setCurrentGroupID, clearCurrentGroupID} = appSlice.actions;

export default appSlice.reducer;
