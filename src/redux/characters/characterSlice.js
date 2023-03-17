import { createSlice } from "@reduxjs/toolkit";

import { fetchCharacters, fetchCharacterById } from "./characterOperations";

const initialState = {
  characters: {
    info: {},
    items: [],
    isLoading: false,
    error: null,
  },
  character: {
    item: {},
    isLoading: false,
    error: null,
  },
  filterName: "",
  page: 1,
};

const handlePending = (state) => {
  state.characters.error = null;
  state.characters.isLoading = true;
};

const handleRejected = (state, action) => {
  state.characters.isLoading = false;
  state.characters.error = action.payload;
};

const handlePendingSingle = (state) => {
  state.character.isLoading = true;
  state.character.error = null;
};

const handleRejectedSingle = (state, action) => {
  state.character.isLoading = false;
  state.character.error = action.payload;
};

const sliceCharacters = createSlice({
  name: "root",
  initialState,
  extraReducers: {
    [fetchCharacters.pending]: handlePending,
    [fetchCharacters.fulfilled](state, action) {
      state.characters.isLoading = false;
      state.characters.error = null;
      if (state.filterName !== action.payload.filterName) {
        state.characters.items = [...action.payload.results];
      } else {
        state.characters.items = [
          ...state.characters.items,
          ...action.payload.results,
        ];
      }
      state.characters.info = action.payload.info;
      state.page = action.payload.page;
      state.filterName = action.payload.filterName;
    },
    [fetchCharacters.rejected]: handleRejected,
    [fetchCharacterById.pending]: handlePendingSingle,
    [fetchCharacterById.fulfilled](state, action) {
      state.character.isLoading = false;
      state.character.error = null;
      state.character.item = action.payload;
    },
    [fetchCharacterById.rejected]: handleRejectedSingle,
  },
});
export const charactersReducer = sliceCharacters.reducer;
