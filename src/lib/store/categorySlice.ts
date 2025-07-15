import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  selectedCategoryId: number | null;
  searchQuery: string;
}

const initialState: CategoryState = {
  selectedCategoryId: null,
  searchQuery: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<number | null>) => {
      state.selectedCategoryId = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearSearch: (state) => {
      state.searchQuery = "";
    },
  },
});

export const { setSelectedCategory, setSearchQuery, clearSearch } =
  categorySlice.actions;
export default categorySlice.reducer;
