import React from "react";
import { NavLink } from "react-router-dom";
import MainContainer from "../components/MainContainer";

function ErrorPage() {
  return (
    <MainContainer>
      <div className="error__container">
        <h1 className="error__header">
          <span>Ooops...</span>
          <span>There is no page with requested URL...</span>
        </h1>
        <p className="error__text">
          <span>
            Please
            <NavLink to="/" className="error__link">
              go back
            </NavLink>
            to the main page and try again!
          </span>
          <span className="error__politeResponse"> Have a nice day!</span>
        </p>
      </div>
    </MainContainer>
  );
}

export default ErrorPage;
