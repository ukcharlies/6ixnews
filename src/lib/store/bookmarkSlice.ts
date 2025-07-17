import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookmarkState {
  ids: number[];
}

const initialState: BookmarkState = {
  ids: [],
};

export const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    initializeBookmarks: (state) => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("bookmarks");
        state.ids = saved ? JSON.parse(saved) : [];
      }
    },
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

export const selectIsBookmarked = (
  state: { bookmarks: BookmarkState },
  id: number
) => {
  return state.bookmarks.ids.includes(id);
};

export const { toggleBookmark, initializeBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
