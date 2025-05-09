import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "../features/auth/slices/signUpSlice";
import ticketCartReducer from "../features/dashboard/tickets/slices/ticketCartSlice";
import classCartReducer from "../features/dashboard/classes/slices/classCartSlice";
import paymentReducer from "../features/dashboard/payments/slices/paymentSlice";
import giftCartReducer from "../features/dashboard/gifts/slices/giftSlice";

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    ticketCart: ticketCartReducer,
    classCart: classCartReducer,
    payment: paymentReducer,
    giftCart: giftCartReducer,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
