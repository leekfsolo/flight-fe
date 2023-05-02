import axiosClient from "./axiosClient";

const cartApi = {
  addItemToCart: (ticketId: string) => {
    const url = "/api/cart";
    return axiosClient.post(url, ticketId, { params: { ticketId } });
  },
  getCartItems: () => {
    const url = "/api/cart";
    return axiosClient.get(url);
  },
};

export default cartApi;
