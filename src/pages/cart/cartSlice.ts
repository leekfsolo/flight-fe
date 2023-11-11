import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookingApi from "api/bookingApi";
import cartApi from "api/cartApi";
import Config from "configuration";
import moment from "moment";
import { IBookingData, ITicket } from "pages/interface";

const initialState = (): { ticketData: ITicket } => {
  const auth = sessionStorage.getItem(Config.storageKey.cart);
  if (auth) {
    return { ...JSON.parse(auth) };
  }

  return {
    ticketData: {
      airline: 0,
      classType: "",
      endDate: moment(new Date()),
      startDate: moment(new Date()),
      entertainment: false,
      id: "",
      meals: 0,
      fromLocation: "",
      price: 0,
      toLocation: "",
      type: "",
      wifi: false,
    },
  };
};

export const createPaypalOrder = createAsyncThunk(
  "cart/create-paypal-order",
  async (data: any) => {
    const res = await cartApi.createPaypalOrder(data);
    return res;
  }
);

export const approvePaypalOrder = createAsyncThunk(
  "cart/approve-paypal-order",
  async (data: { orderId: string }) => {
    const res = await cartApi.approvePaypalOrder(data);
    return res;
  }
);

export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  const res = await cartApi.getCartItems();
  return res;
});

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (ticketId: string) => {
    const res = await cartApi.addItemToCart(ticketId);
    return res;
  }
);

export const addBooking = createAsyncThunk(
  "cart/addBooking",
  async (data: IBookingData) => {
    const res = await bookingApi.addBooking(data);
    return res;
  }
);

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handleSaveTicketData: (state, action) => {
      state.ticketData = action.payload;
      sessionStorage.setItem(Config.storageKey.cart, JSON.stringify(state));
    },
  },
  extraReducers: (builders) => {},
});

const { reducer, actions } = cart;
export const { handleSaveTicketData } = actions;
export default reducer;
