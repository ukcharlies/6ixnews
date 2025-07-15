import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "./bookmarkSlice";
import categoryReducer from "./categorySlice";

export const store = configureStore({
  reducer: {
    bookmarks: bookmarkReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
