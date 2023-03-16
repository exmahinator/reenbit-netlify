import React from 'react';
import MainContainer from '../components/MainContainer';
import Title from '../components/Title';
import SearchBar from '../components/SearchBar';
import HomeList from '../components/HomeList';

function HomePage() {
  return (
    <MainContainer>
      <Title />
      <SearchBar />
      <HomeList />
    </MainContainer>
  );
}

export default HomePage;
