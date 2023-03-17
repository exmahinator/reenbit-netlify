import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../redux/characters/characterOperations';
import debounce from 'lodash.debounce';
import { filterNameSelector } from '../redux/characters/characterSelectors';

function SearchBar() {
  const dispatch = useDispatch();

  const filterName = useSelector(filterNameSelector)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchByName = useCallback(
    debounce(event => {
      dispatch(fetchCharacters({ page: 1, name: event.target.value.trim().toLowerCase() }));
    }, 1000)
  , []);
  
  return (
    <div className="filter__container">
      <div className="filter__subContainer">
        <div className="filter__iconContainer"></div>
        <input
          id="search"
          type="text"
          name="filterCharacter"
          placeholder="Filter by name..."
          className="filter__input"
          defaultValue={filterName}
          onChange={searchByName}
        />
      </div>
    </div>
  );
}

export default SearchBar;
