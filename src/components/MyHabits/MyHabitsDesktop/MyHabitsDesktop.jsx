import React from "react";
import styled from "styled-components";
import Goals from "components/Goals/Goals";
import HabitGoals from "components/HabitGoals/HabitGoals";

const GridContainer = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-areas:
    "nav"
    "main";
  grid-template-columns: 30% 70%;
  grid-template-rows: 1fr;
`;
const NavContainer = styled.div`
  grid-area: "nav";
  background-color: #cdcdcd;
  padding-top: 50px;
  padding-left: 100px;
  z-index: 10;
`;
const MainContainer = styled.div`
  grid-area: "main";
  padding-top: 30px;
`;

const Title = styled.div`
  font-size: 30px;
  margin-bottom: 100px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15), 0px 4px 8px rgba(0, 0, 0, 0.15),
    0px 8px 16px rgba(0, 0, 0, 0.15), 0px 16px 32px rgba(0, 0, 0, 0.15);
  padding-bottom: 30px;
`;

const HeaderItem = styled.a`
  padding-right: 100px;
  font-size: 22px;
  color: black;
  text-decoration: none;
  padding-bottom: 10px;
`;

const MyHabitsDesktop = () => {
  return (
    <GridContainer>
      <NavContainer>
        <Title>Consistency</Title>
        <Goals />
      </NavContainer>
      <MainContainer>
        <HeaderContainer>
          <HeaderItem as="a" href="/">
            Habit-tracker
          </HeaderItem>
        </HeaderContainer>
        <HabitGoals />
      </MainContainer>
    </GridContainer>
  );
};

export default MyHabitsDesktop;
