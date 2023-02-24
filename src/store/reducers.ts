import {combineReducers} from '@reduxjs/toolkit';
import appSlice from './appSlice';
import authSlice from './authSlice';
import themeSlice from './themeSlice';

export const rootReducer = combineReducers({
  theme: themeSlice,
  auth: authSlice,
  app: appSlice,
});
