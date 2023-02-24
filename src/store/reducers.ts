import {combineReducers} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import themeSlice from './themeSlice';

export const rootReducer = combineReducers({
  theme: themeSlice,
  auth: authSlice,
});
