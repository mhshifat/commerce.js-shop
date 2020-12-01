import React, { Fragment } from "react";
import { HomeContainer } from "../containers";

const Home: React.FC<any> = (props) => {
  return (
    <Fragment>
      <HomeContainer {...props} />
    </Fragment>
  );
};

export default Home;
