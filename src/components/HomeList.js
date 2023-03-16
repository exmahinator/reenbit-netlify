import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters } from '../redux/characters/characterOperations';

// import {
//   selectCharacters,
//   selectCharactersLoading,
//   selectCharactersError,
//   currentPageSelector,
//   filterNameSelector,
//   currentFetchInfo
// } from '../redux/characters/characterSelectors';

import { selectCharacters, selectCharactersError, selectCharactersLoading, currentPageSelector, filterNameSelector, currentFetchInfo } from '../redux/characters/characterSelectors';

import debounce from 'lodash.debounce';

import { ThreeCircles } from 'react-loader-spinner';
import ListOfCharacters from './ListOfCharacters';
import ScrollBtn from './ScrollBtn';

function HomeList() {
  const dispatch = useDispatch();
  const callbackRef = useRef();
  const nameRef = useRef();

  const characters = useSelector(selectCharacters);
  const isLoading = useSelector(selectCharactersLoading);
  const error = useSelector(selectCharactersError);
  const currentPage = useSelector(currentPageSelector);
  const filterName = useSelector(filterNameSelector);
  const currentInfo = useSelector(currentFetchInfo)

  nameRef.current = filterName;

  const listLength = characters.length;

  const handleScroll = () => {
    const scrollAtBottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    if (scrollAtBottom && !isLoading && currentInfo.next) {
      dispatch(fetchCharacters({ page: currentPage + 1, name: filterName }));
    }
  };

  useEffect(() => {
    if (listLength === 0) {
      dispatch(fetchCharacters({ page: currentPage, name: filterName }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (callbackRef.current)
      window.removeEventListener('scroll', callbackRef.current);

    callbackRef.current = debounce(handleScroll, 300);

    window.addEventListener('scroll', callbackRef.current);

    return () => {
      window.removeEventListener('scroll', callbackRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filterName, currentInfo]);

  return (
    <>
      <ScrollBtn
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        additionalClass="scrollBtn__container--top"
      >
        To top
      </ScrollBtn>
      {error && (
        <p className="character__error">
          Ooops... There is no one here... Rick is searching for Morty... Come
          back later...
        </p>
      )}
      {listLength === 0 && !error && (
        <p className="character__error">
          Ooops... Somehow there is no list to be displayed. Try to reload the
          page.
        </p>
      )}
      {listLength > 0 && !error && <ListOfCharacters />}
      {isLoading && (
        <div className="character__loader">
          <ThreeCircles
            height="100"
            width="100"
            color="rgb(0,176,199)"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        </div>
      )}
      <ScrollBtn
        onClick={() =>
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          })
        }
        additionalClass="scrollBtn__container--bottom"
      >
        To bottom
      </ScrollBtn>
    </>
  );
}

export default HomeList;
