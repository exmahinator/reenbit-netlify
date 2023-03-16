import React from "react";

function MainContainer({ children }) {
  return (
    <section className="section">
      <div className="container">{children}</div>
    </section>
  );
}

export default MainContainer;
