import { createSlice } from "@reduxjs/toolkit";

export interface ISignUp {
  firstName: string;
  lastName: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  password: string;
  passwordConfirm: string;
  agreesToTerms: boolean;
  signedForNewsletter: boolean;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  parentContact: {
    email: string;
  };
}

const initialState = {
  firstName: "",
  lastName: "",
  birthDate: "",
  phoneNumber: "",
  email: "",
  password: "",
  passwordConfirm: "",
  agreesToTerms: false,
  signedForNewsletter: false,
  address: "",
  city: "",
  postalCode: "",
  country: "",
  parentContact: {
    email: "",
  },
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setBirthDate: (state, action) => {
      state.birthDate = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setPasswordConfirm: (state, action) => {
      state.passwordConfirm = action.payload;
    },
    setAgreesToTerms: (state, action) => {
      state.agreesToTerms = action.payload;
    },
    setSignedForNewsletter: (state, action) => {
      state.signedForNewsletter = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setPostalCode: (state, action) => {
      state.postalCode = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setParentContactMail: (state, action) => {
      state.parentContact.email = action.payload;
    },
    clearSignupData: () => initialState,
  },
});

export const {
  setFirstName,
  setLastName,
  setBirthDate,
  setPhoneNumber,
  setEmail,
  setPassword,
  setPasswordConfirm,
  setAgreesToTerms,
  setSignedForNewsletter,
  setAddress,
  setCity,
  setPostalCode,
  setCountry,
  setParentContactMail,
  clearSignupData,
} = signUpSlice.actions;

export default signUpSlice.reducer;

export const getSignUpData = (state: { signUp: ISignUp }) => state.signUp;
