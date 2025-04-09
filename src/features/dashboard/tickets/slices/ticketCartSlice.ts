import { createSlice } from "@reduxjs/toolkit";

interface ITicketCart {
  articles: {
    articleId: string;
    quantity: string;
    gift: boolean;
  }[];
}

const initialState: ITicketCart = { articles: [] };

const ticketCartSlice = createSlice({
  name: "ticketCart",
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articles = [...state.articles, action.payload];
    },
    clearTicketData: () => initialState,
  },
});

export const { setArticles, clearTicketData } = ticketCartSlice.actions;

export default ticketCartSlice.reducer;

export const getTicketCart = (state: { ticketCart: ITicketCart }) =>
  state.ticketCart.articles;
