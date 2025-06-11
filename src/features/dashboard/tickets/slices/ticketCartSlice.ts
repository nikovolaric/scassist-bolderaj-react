import { createSlice } from "@reduxjs/toolkit";

interface ITicketCart {
  articles: {
    articleId: string;
    quantity: string;
  }[];
  company: {
    name: string;
    address: string;
    postalCode: string;
    city: string;
    taxNumber: string;
  };
}

const initialState: ITicketCart = {
  articles: [],
  company: {
    name: "",
    address: "",
    postalCode: "",
    city: "",
    taxNumber: "",
  },
};

const ticketCartSlice = createSlice({
  name: "ticketCart",
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articles = [...state.articles, action.payload];
      localStorage.setItem("articles", JSON.stringify(state.articles));
    },
    setCompanyName: (state, action) => {
      state.company.name = action.payload;
    },
    setCompanyAddress: (state, action) => {
      state.company.address = action.payload;
    },
    setCompanyCity: (state, action) => {
      state.company.city = action.payload;
    },
    setCompanyPostalCode: (state, action) => {
      state.company.postalCode = action.payload;
    },
    setCompanyTax: (state, action) => {
      state.company.taxNumber = action.payload;
    },
    clearCompanyInfo: (state) => {
      state.company = initialState.company;
    },
    clearTicketData: () => initialState,
  },
});

export const {
  setArticles,
  setCompanyName,
  setCompanyAddress,
  setCompanyCity,
  setCompanyPostalCode,
  setCompanyTax,
  clearCompanyInfo,
  clearTicketData,
} = ticketCartSlice.actions;

export default ticketCartSlice.reducer;

export const getTicketCart = (state: { ticketCart: ITicketCart }) =>
  state.ticketCart;
