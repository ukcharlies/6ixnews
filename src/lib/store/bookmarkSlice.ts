import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookmarkState {
  ids: number[];
}

const loadFromLocalStorage = (): number[] => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const initialState: BookmarkState = {
  ids: loadFromLocalStorage(),
};

export const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    toggleBookmark: (state, action: PayloadAction<number>) => {
      const index = state.ids.indexOf(action.payload);
      if (index === -1) {
        state.ids.push(action.payload);
      } else {
        state.ids.splice(index, 1);
      }
      localStorage.setItem("bookmarks", JSON.stringify(state.ids));
    },
  },
});

export const { toggleBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
