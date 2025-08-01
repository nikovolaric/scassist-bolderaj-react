import { createSlice } from "@reduxjs/toolkit";

interface IClassCart {
  articleId: string;
  classes: string[];
  paymentMethod: string | undefined;
}

const initialState: IClassCart = {
  articleId: "",
  classes: [],
  paymentMethod: undefined,
};

const classCartSlice = createSlice({
  name: "classCart",
  initialState,
  reducers: {
    setArticleId: (state, action) => {
      state.articleId = action.payload;
    },
    setClasses: (state, action) => {
      state.classes = [...state.classes, action.payload];
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    clearOneClass: (state, action) => {
      state.classes = state.classes.filter((el) => el !== action.payload);
    },
    clearClassData: () => {
      localStorage.removeItem("classCart");
      return initialState;
    },
  },
});

export const {
  setArticleId,
  setClasses,
  setPaymentMethod,
  clearClassData,
  clearOneClass,
} = classCartSlice.actions;

export default classCartSlice.reducer;

export const getClassCart = (state: { classCart: IClassCart }) =>
  state.classCart;
