import React from "react";
import styled, { keyframes } from "styled-components";
import AddHabitButton from "./AddHabitButton/AddHabitButton";
import Habits from "./Habits/Habits";
import { useGoalsContext } from "GoalsContext";

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const NoHabitsContainer = styled.div`
  font-size: 50px;
  animation: ${fadeInAnimation} 0.5s ease-in-out forwards;
`;
const HabitGoalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 70vh;
  align-items: center;
  margin-top: 50px;
`;
const HabitGoalCon = styled.div`
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15), 0px -2px 4px rgba(0, 0, 0, 0.15), -2px 0px 4px rgba(0, 0, 0, 0.15), 2px 0px 4px rgba(0, 0, 0, 0.15), 0px 2px 4px rgba(0, 0, 0, 0.15), 0px 4px 8px rgba(0, 0, 0, 0.15), 0px 8px 16px rgba(0, 0, 0, 0.15), 0px 16px 32px rgba(0, 0, 0, 0.15), -2px -2px 4px rgba(0, 0, 0, 0.15), 2px -2px 4px rgba(0, 0, 0, 0.15), -2px 2px 4px rgba(0, 0, 0, 0.15), 2px 2px 4px rgba(0, 0, 0, 0.15);  
  width: 70%;
  border-radius: 8px;
  margin-bottom: 30px;
  :last-child {
    margin-bottom: 0;
  }
  animation: ${fadeInAnimation} 0.5s ease-in-out forwards; 
  padding: 20px;
}`;
const HabitGoal = styled.div`
  padding: 30px;
  padding-left: 10px;
  display: flex;
  justify-content: space-between;
`;
const CategoryTitle = styled.div`
  font-size: 35px;
`;
const HabitsTitle = styled.div`
  padding: 10px;
  margin-left: 10px;
  font-size: 25px;
`;

const HabitGoals = () => {
  const { AllGoals, setAllGoals } = useGoalsContext();

  const handleHabitAdded = (newHabitData, goalId) => {
    const localGoals = [...AllGoals];

    const updatedGoals = localGoals.map((goal) => {
      if (goal.id === goalId) {
        const existingHabit = goal.habits.find(
          (habit) => habit.habitName === newHabitData.habitName
        );

        if (!existingHabit) {
          goal.habits.push(newHabitData);
        }
      }
      return goal;
    });

    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    setAllGoals(updatedGoals);
  };

  return (
    <HabitGoalsContainer>
      {AllGoals.length === 0 ? (
        <NoHabitsContainer>No Habits</NoHabitsContainer>
      ) : (
        AllGoals.map((goal, index) => (
          <HabitGoalCon key={goal.name}>
            <HabitGoal>
              <CategoryTitle>{goal.name}</CategoryTitle>

              <AddHabitButton
                goalId={goal.id}
                onHabitAdded={(newHabitData) =>
                  handleHabitAdded(newHabitData, goal.id)
                }
              />
            </HabitGoal>
            <HabitsTitle>Habits:</HabitsTitle>
            <Habits goalId={goal.id} />
          </HabitGoalCon>
        ))
      )}
    </HabitGoalsContainer>
  );
};
export default HabitGoals;
