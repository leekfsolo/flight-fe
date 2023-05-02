import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ticketApi from "api/ticketApi";
import { ITicket } from "pages/interface";

const initialState: { ticketList: ITicket[] } = {
  ticketList: [],
};

export const getTrendTickets = createAsyncThunk(
  "cart/getTrendTickets",
  async () => {
    const res = await ticketApi.getTrendTickets();
    return res;
  }
);

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(
      getTrendTickets.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.ticketList = action.payload;
      }
    );
  },
});

const { reducer } = cart;
export default reducer;
