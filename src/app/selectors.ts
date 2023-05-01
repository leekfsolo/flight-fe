import { RootState } from "./store";

export const authSelector = (state: RootState) => state.auth;

export const globalSelector = (state: RootState) => state.global;
