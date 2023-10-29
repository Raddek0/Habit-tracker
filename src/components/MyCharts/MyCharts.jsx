import React from "react";
import styled from "styled-components";
import MyChartsDesktop from "./MyChartsDesktop/MyChartsDesktop";

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

const MyCharts = () => {
  return (
    <>
      <DesktopContainer>
        <MyChartsDesktop />
      </DesktopContainer>
      <MobileContainer>Mobile</MobileContainer>
    </>
  );
};

export default MyCharts;
