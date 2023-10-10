import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  min-height: 100vh;
`;
const NavBar = styled.div`
  height: 17vh;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15), 0px 4px 8px rgba(0, 0, 0, 0.15),
    0px 8px 16px rgba(0, 0, 0, 0.15), 0px 16px 32px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const PageTitle = styled.a`
  font-size: 30px;
  letter-spacing: 4px;
  cursor: pointer;
  color: black;
  text-decoration: none;
`;
const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 20%;
`;
const NavigationItem = styled.a`
  font-size: 22px;
  cursor: pointer;
  color: black;
  text-decoration: none;
`;
const NavigationItemWelcome = styled.a`
  font-size: 25px;
  cursor: pointer;
  color: white;
  background-color: #9da631;
  padding: 5px;
  border-radius: 3px;
  margin-left: 5px;
`;
const MainPageTitle = styled.div`
  height: 55vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 90px;
  font-family: "Courier New";
  letter-spacing: 10px;
`;
const MainPageDesc = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-family: "Courier New";
`;

const Welcome = () => {
  return (
    <MainContainer>
      <NavBar>
        <PageTitle as="a" href="/">
          Habit-tracker
        </PageTitle>
        <NavigationContainer>
          <NavigationItem as="a" href="/habits">
            MyHabits
          </NavigationItem>
          <NavigationItemWelcome>Hi User</NavigationItemWelcome>
        </NavigationContainer>
      </NavBar>
      <MainPageTitle>Welcome</MainPageTitle>
      <MainPageDesc>Maintain your habits in the best app!</MainPageDesc>
    </MainContainer>
  );
};

export default Welcome;
