import { createSlice } from "@reduxjs/toolkit";

interface IPaymentSlice {
  card: {
    holder: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
  };
  amount: string;
  errors: { expiryError: string };
}

const initialState: IPaymentSlice = {
  card: {
    holder: "",
    number: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  },
  amount: "",
  errors: { expiryError: "" },
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setHolder: (state, action) => {
      state.card.holder = action.payload;
    },
    setNumber: (state, action) => {
      state.card.number = action.payload.replaceAll(" ", "");
    },
    setExpiry: (state, action) => {
      const [month, year] = action.payload.split("/");
      if (
        Number(year) < new Date().getFullYear() ||
        (Number(month) < new Date().getMonth() + 1 &&
          Number(year) === new Date().getFullYear())
      ) {
        state.errors.expiryError = "Kartica ni več veljavna";
      } else {
        state.errors.expiryError = "";
        state.card.expiryMonth = month;
        state.card.expiryYear = year;
      }
    },
    setCVV: (state, action) => {
      state.card.cvv = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    clearPayment: () => initialState,
  },
});

export const {
  setHolder,
  setNumber,
  setExpiry,
  setCVV,
  setAmount,
  clearPayment,
} = paymentSlice.actions;

export default paymentSlice.reducer;

export const getPaymentData = (state: { payment: IPaymentSlice }) =>
  state.payment;
