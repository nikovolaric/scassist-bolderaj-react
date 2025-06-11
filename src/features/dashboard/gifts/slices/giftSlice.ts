import { createSlice } from "@reduxjs/toolkit";

interface IGiftCart {
  articles: {
    articleId: string;
    quantity: string;
  }[];
}

const initialState: IGiftCart = {
  articles: [],
};

const giftCartSlice = createSlice({
  name: "giftCart",
  initialState,
  reducers: {
    setGiftArticles: (state, action) => {
      state.articles = [...state.articles, action.payload];
      localStorage.setItem("articles", JSON.stringify(state.articles));
    },

    clearGiftData: () => initialState,
  },
});

export const { setGiftArticles, clearGiftData } = giftCartSlice.actions;

export default giftCartSlice.reducer;

export const getGiftCart = (state: { giftCart: IGiftCart }) => state.giftCart;
