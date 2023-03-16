import React, { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { fetchCharacterById } from '../redux/characters/characterOperations';

import { selectSingleCharacter, selectSingleCharacterError, selectSingleCharacterLoading } from '../redux/characters/characterSelectors';

import { ThreeCircles } from 'react-loader-spinner';

function CharacterDetails() {
  const { characterId } = useParams();

  const dispatch = useDispatch();

  const getCharacter = useSelector(selectSingleCharacter);
  const getLoading = useSelector(selectSingleCharacterLoading);
  const getError = useSelector(selectSingleCharacterError);
  

  const {
    id = '',
    name,
    gender,
    image,
    status,
    type,
    species,
    origin,
  } = getCharacter;

  useEffect(() => {
    if (
      Object.keys(getCharacter).length === 0 ||
      id.toString() !== characterId.toString()
    ) {
      dispatch(fetchCharacterById(characterId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {getLoading && (
        <div className="character__loader character__loader--extra__margin">
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
      {(getError || Object.keys(getCharacter).length === 0) && (
        <p className="character__error character__error--extra__margin">
          Ooops... Something went wrong... Please{' '}
          <NavLink to="/" className="error__link">
            go back
          </NavLink>{' '}
          to the main page and try again.
        </p>
      )}
      {!getError && !getLoading && Object.keys(getCharacter).length !== 0 && (
        <div className="details__container" key={id}>
          <div className="details__imgContainer">
            <img
              src={image}
              alt={name}
              width={300}
              className="details__image"
            />
          </div>
          <div className="details__descriptionContainer">
            <h1 className="details__name">{name}</h1>
            <div className="details__descriptionSubContainer">
              <h2 className="details__infoText">Informations</h2>
              <ul className="details__list">
                <li className="details__item">
                  <h3 className="details__itemHeader">Gender</h3>
                  <p className="details__itemInfo">{gender}</p>
                </li>
                <li className="details__item">
                  <h3 className="details__itemHeader">Status</h3>
                  <p className="details__itemInfo">{status}</p>
                </li>
                <li className="details__item">
                  <h3 className="details__itemHeader">Specie</h3>
                  <p className="details__itemInfo">{species}</p>
                </li>
                <li className="details__item">
                  <h3 className="details__itemHeader">Origin</h3>
                  <p className="details__itemInfo">{origin?.name}</p>
                </li>
                <li className="details__item">
                  <h3 className="details__itemHeader">Type</h3>
                  <p className="details__itemInfo">
                    {type === '' ? 'undefined' : type}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CharacterDetails;
