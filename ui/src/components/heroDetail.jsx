import React from "react";

const HeroDetail = ({ match }) => {
  return <h1>{match.params.id}</h1>;
};

export default HeroDetail;
