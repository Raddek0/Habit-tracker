import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DeleteHabitButton from "../DeleteHabitButton/DeleteHabitButton";
import { useGoalsContext } from "GoalsContext";

const HabitsContainer = styled.div``;
const HabitDesc = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  margin-bottom: 10px;
`;
const HabitHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;
const HabitTitle = styled.div`
  font-size: 20px;
  padding: 12px;
  margin-left: 10px;
`;
const HabitDayContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
const DayCon = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  accent-color: #9da631;
`;
const HabitError = styled.div`
  font-size: 25px;
  display: flex;
  justify-content: center;
`;

const Habits = ({ goalId }) => {
  const { AllGoals, setAllGoals } = useGoalsContext();
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const currentGoal = AllGoals.find((goal) => goal.id === goalId);
    if (currentGoal) {
      setHabits(currentGoal.habits || []);
    }
  }, [goalId, AllGoals]);

  const handleHabitAdded = (newHabitData) => {
    const updatedGoals = AllGoals.map((goal) => {
      if (goal.id === goalId) {
        goal.habits.push(newHabitData);
      }
      return goal;
    });

    setAllGoals(updatedGoals);

    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  const handleHabitDeleted = (goalId, habitName) => {
    const updatedGoals = AllGoals.map((goal) => {
      if (goal.id === goalId) {
        goal.habits = goal.habits.filter(
          (habit) => habit.habitName !== habitName
        );
      }
      return goal;
    });

    setAllGoals(updatedGoals);

    const updatedHabits =
      updatedGoals.find((goal) => goal.id === goalId)?.habits || [];
    setHabits(updatedHabits);

    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  return (
    <>
      {habits.map((habit, habitIndex) => (
        <HabitsContainer key={habitIndex}>
          <HabitDesc key={habitIndex}>
            <HabitHeader>
              <HabitTitle>{habit.habitName}</HabitTitle>
              <DeleteHabitButton
                goalId={goalId}
                habitName={habit.habitName}
                onHabitDeleted={() =>
                  handleHabitDeleted(goalId, habit.habitName)
                }
              />
            </HabitHeader>
            <HabitDayContainer>
              <DayCon>
                <label>MON</label>
                <input type="checkbox" id={`Monday-${habitIndex + 1}`} />
              </DayCon>
              <DayCon>
                <label>TUE</label>
                <input type="checkbox" id={`Tuesday-${habitIndex + 1}`} />
              </DayCon>
              <DayCon>
                <label>WED</label>
                <input type="checkbox" id={`Wednesday-${habitIndex + 1}`} />
              </DayCon>
              <DayCon>
                <label>THU</label>
                <input type="checkbox" id={`Thursday-${habitIndex + 1}`} />
              </DayCon>
              <DayCon>
                <label>FRI</label>
                <input type="checkbox" id={`Friday-${habitIndex + 1}`} />
              </DayCon>
              <DayCon>
                <label>SAT</label>
                <input type="checkbox" id={`Saturday-${habitIndex + 1}`} />
              </DayCon>
              <DayCon>
                <label>SUN</label>
                <input type="checkbox" id={`Sunday-${habitIndex + 1}`} />
              </DayCon>
            </HabitDayContainer>
          </HabitDesc>
        </HabitsContainer>
      ))}

      {habits.length === 0 && (
        <HabitDesc>
          <HabitError>No habits</HabitError>
        </HabitDesc>
      )}
    </>
  );
};

export default Habits;
