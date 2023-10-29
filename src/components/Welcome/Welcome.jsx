import React from "react";
import styled from "styled-components";
import WelcomeDesktop from "./WelcomeDesktop/WelcomeDesktop";

const DesktopContainer = styled.div`
  @media only screen and (max-width: 699px) {
    display: none;
  }
`;

const MobileContainer = styled.div`
  @media only screen and (min-width: 700px) {
    display: none;
  }
`;

const cos = styled.div`
  width: 100px;
  height: 100px;
  z-index: 6456400;
  background-color: red;
`;

const Welcome = () => {
  return (
    <>
      <DesktopContainer>
        <WelcomeDesktop />
      </DesktopContainer>
      <MobileContainer>Mobile</MobileContainer>
    </>
  );
};

export default Welcome;
