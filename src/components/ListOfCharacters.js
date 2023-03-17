import React, { useMemo, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCharacters } from "../redux/characters/characterSelectors";

function ListOfCharacters() {
  const getCharacters = useSelector(selectCharacters);

  const sortedInAlphabeticalOrder = useMemo(
    () =>
      [...getCharacters].sort((firstCharacter, secondCharacter) =>
        firstCharacter.name.localeCompare(secondCharacter.name)
      ),
    [getCharacters]
  );

  useEffect(() => {
    if (sortedInAlphabeticalOrder.length) {
      const scrollPosition = sessionStorage.getItem("scrollPosition");
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
        sessionStorage.removeItem("scrollPosition");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedInAlphabeticalOrder]);

  return (
    <div className="character__container">
      <h1 className="visually-hidden">List of heroes</h1>
      <ul className="character__list">
        {sortedInAlphabeticalOrder.map(({ id, name, species, image }) => {
          return (
            <li className="character__item" key={id}>
              <NavLink
                to={`details/${id}`}
                onClick={() => {
                  sessionStorage.setItem("scrollPosition", window.pageYOffset);
                }}
              >
                <div className="character__itemContainer">
                  <img
                    loading="lazy"
                    src={image}
                    alt={name}
                    width="308px"
                    className="character__image"
                  />
                  <div className="character__itemSubContainer">
                    <h2 className="character__name">{name}</h2>
                    <p className="character__specie">{species}</p>
                  </div>
                </div>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListOfCharacters;
