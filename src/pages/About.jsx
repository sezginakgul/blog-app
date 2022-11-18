import React from "react";
import { useLoginContext } from "../contexts/AuthContext";

const About = () => {
  const { currentUser } = useLoginContext();
  console.log("About", currentUser);
  return <div>About</div>;
};

export default About;
