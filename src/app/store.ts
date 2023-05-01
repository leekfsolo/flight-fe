import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "pages/auth/authSlice";
import globalReducer from "app/globalSlice";
export const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
