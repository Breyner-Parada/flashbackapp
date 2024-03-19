import { configureStore } from '@reduxjs/toolkit';
import postReducer from './Slice';

export const store = configureStore({
  reducer: {
    posts: postReducer,
  }
});

