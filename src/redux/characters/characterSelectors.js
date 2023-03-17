import { createSelector } from "@reduxjs/toolkit";

// ==============================================================
export const rootSelector = (state) => state.root;
// ==============================================================

// ---------------------------------------------------------------
export const charactersSelector = createSelector(
  rootSelector,
  ({ characters }) => characters
);

export const singleCharacterSelector = createSelector(
  rootSelector,
  ({ character }) => character
);

export const currentPageSelector = createSelector(
  rootSelector,
  ({ page }) => page
);

export const filterNameSelector = createSelector(
  rootSelector,
  ({ filterName }) => filterName
);
// -----------------------------------------------------------------

export const currentFetchInfo = createSelector(
  charactersSelector,
  ({ info }) => info
);

export const selectCharacters = createSelector(
  charactersSelector,
  ({ items }) => items
);

export const selectCharactersLoading = createSelector(
  charactersSelector,
  ({ isLoading }) => isLoading
);

export const selectCharactersError = createSelector(
  charactersSelector,
  ({ error }) => error
);

export const selectSingleCharacter = createSelector(
  singleCharacterSelector,
  ({ item }) => item
);

export const selectSingleCharacterLoading = createSelector(
  singleCharacterSelector,
  ({ isLoading }) => isLoading
);

export const selectSingleCharacterError = createSelector(
  singleCharacterSelector,
  ({ error }) => error
);
