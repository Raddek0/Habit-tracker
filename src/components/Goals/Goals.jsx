import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch } from "react-redux";
import AddGoalButton from "./AddGoalButton/AddGoalButton";
import UpdateGoalButton from "./UpdateGoalButton/UpdateGoalButton";
import DeleteGoalButton from "./DeleteGoalButton/DeleteGoalButton";
import HabitGoals from "components/HabitGoals/HabitGoals";
import { useGoalsContext } from "GoalsContext";

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const GoalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 45px;
`;
const GoalsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 45px;
`;
const TitleSection = styled.div`
  text-transform: uppercase;
  letter-spacing: 8px;
  font-size: 30px;
`;
const GoalRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 45px;
  :last-child {
    margin-bottom: 0;
  }

  animation: ${fadeInAnimation} 0.5s ease-in-out forwards;
`;
const Name = styled.div`
  text-transform: uppercase;
`;
const Action = styled.div`
  display: flex;
  align-items: center;
  img {
    max-width: 20px;
    // width: 100%;
    margin-right: 8px;
    cursor: pointer;
  }
`;

const Goals = () => {
  // const [AllGoals, setAllGoals] = useState([]);
  const { AllGoals, setAllGoals } = useGoalsContext();

  useEffect(() => {
    const localGoals = JSON.parse(localStorage.getItem("goals")) || [];
    setAllGoals(localGoals);
  }, []);

  const handleGoalAdded = (newGoal) => {
    setAllGoals((prevGoals) => [...prevGoals, newGoal]);
  };

  const handleGoalUpdated = (updatedGoals) => {
    setAllGoals(updatedGoals);
  };

  const handleGoalDeleted = (deletedGoalId) => {
    const updatedGoals = AllGoals.filter((goal) => goal.id !== deletedGoalId);
    setAllGoals(updatedGoals);
  };

  return (
    <GoalsContainer>
      <GoalsHeader>
        <TitleSection>Categories</TitleSection>
        <AddGoalButton onGoalAdded={handleGoalAdded}></AddGoalButton>
      </GoalsHeader>
      {AllGoals.map((goal, index) => (
        <GoalRow key={"goal-number-" + index}>
          <Name>{goal.name}</Name>
          <Action>
            <UpdateGoalButton
              initialGoal={{ id: index, name: goal.name }}
              onGoalUpdated={handleGoalUpdated}
            />
            <DeleteGoalButton goal={goal} onGoalDeleted={handleGoalDeleted} />
          </Action>
        </GoalRow>
      ))}
    </GoalsContainer>
  );
};

export default Goals;
