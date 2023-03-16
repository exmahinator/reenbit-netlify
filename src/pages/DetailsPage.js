import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import MainContainer from '../components/MainContainer';
import CharacterDetails from './CharacterDetails';

function DetailsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainContainer>
      <NavLink to="/" className="details__link">
        <div className="details__linkIconContainer"></div>
        <span className="details__linkText">GO BACK</span>
      </NavLink>
      <CharacterDetails />
    </MainContainer>
  );
}

export default DetailsPage;
