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
const HabitHeaderButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 10vh;
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
const ResetButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  background-color: #9da631;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #d32f2f;
  }
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

  const handleCheckboxChange = (habitIndex, day) => {
    const updatedHabits = [...habits];
    updatedHabits[habitIndex].checkboxes[day] =
      !updatedHabits[habitIndex].checkboxes[day];

    setHabits(updatedHabits);

    const updatedGoals = AllGoals.map((goal) => {
      if (goal.id === goalId) {
        goal.habits = updatedHabits;
      }
      return goal;
    });

    setAllGoals(updatedGoals);

    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

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

  const handleReset = (habitName) => {
    const updatedHabits = habits.map((habit) => {
      if (habit.habitName === habitName) {
        Object.keys(habit.checkboxes).forEach((day) => {
          habit.checkboxes[day] = false;
        });
      }
      return habit;
    });

    setHabits(updatedHabits);

    const updatedGoals = AllGoals.map((goal) => {
      if (goal.id === goalId) {
        goal.habits = updatedHabits;
      }
      return goal;
    });

    setAllGoals(updatedGoals);

    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  return (
    <>
      {habits.map((habit, habitIndex) => (
        <HabitsContainer key={habitIndex}>
          <HabitDesc key={habitIndex}>
            <HabitHeader>
              <HabitTitle>{habit.habitName}</HabitTitle>
              <HabitHeaderButtons>
                <ResetButton onClick={() => handleReset(habit.habitName)}>
                  Reset
                </ResetButton>
                <DeleteHabitButton
                  goalId={goalId}
                  habitName={habit.habitName}
                  onHabitDeleted={() =>
                    handleHabitDeleted(goalId, habit.habitName)
                  }
                />
              </HabitHeaderButtons>
            </HabitHeader>
            <HabitDayContainer key={habitIndex}>
              <DayCon>
                <label>MON</label>
                <input
                  type="checkbox"
                  id={`Monday-${habitIndex + 1}`}
                  checked={habit.checkboxes.Monday}
                  onChange={() => handleCheckboxChange(habitIndex, "Monday")}
                />
              </DayCon>
              <DayCon>
                <label>TUE</label>
                <input
                  type="checkbox"
                  id={`Tuesday-${habitIndex + 1}`}
                  checked={habit.checkboxes.Tuesday}
                  onChange={() => handleCheckboxChange(habitIndex, "Tuesday")}
                />
              </DayCon>
              <DayCon>
                <label>WED</label>
                <input
                  type="checkbox"
                  id={`Wednesday-${habitIndex + 1}`}
                  checked={habit.checkboxes.Wednesday}
                  onChange={() => handleCheckboxChange(habitIndex, "Wednesday")}
                />
              </DayCon>
              <DayCon>
                <label>THU</label>
                <input
                  type="checkbox"
                  id={`Thursday-${habitIndex + 1}`}
                  checked={habit.checkboxes.Thursday}
                  onChange={() => handleCheckboxChange(habitIndex, "Thursday")}
                />
              </DayCon>
              <DayCon>
                <label>FRI</label>
                <input
                  type="checkbox"
                  id={`Friday-${habitIndex + 1}`}
                  checked={habit.checkboxes.Friday}
                  onChange={() => handleCheckboxChange(habitIndex, "Friday")}
                />
              </DayCon>
              <DayCon>
                <label>SAT</label>
                <input
                  type="checkbox"
                  id={`Saturday-${habitIndex + 1}`}
                  checked={habit.checkboxes.Saturday}
                  onChange={() => handleCheckboxChange(habitIndex, "Saturday")}
                />
              </DayCon>
              <DayCon>
                <label>SUN</label>
                <input
                  type="checkbox"
                  id={`Sunday-${habitIndex + 1}`}
                  checked={habit.checkboxes.Sunday}
                  onChange={() => handleCheckboxChange(habitIndex, "Sunday")}
                />
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
