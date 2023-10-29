import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useGoalsContext } from "GoalsContext";
import { FaHome } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const Container = styled.div``;

const Title = styled.div`
  font-size: 40px;
  letter-spacing: 5px;
  padding-left: 70px;
`;
const TitleContainer = styled.div``;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15), 0px 4px 8px rgba(0, 0, 0, 0.15),
    0px 8px 16px rgba(0, 0, 0, 0.15), 0px 16px 32px rgba(0, 0, 0, 0.15);
  padding: 30px;
`;

const HeaderItemsContainer = styled.div`
  justify-content: flex-end;
`;

const HeaderItem = styled.a`
  padding-right: 100px;
  font-size: 22px;
  color: black;
  text-decoration: none;
  padding-bottom: 10px;
`;

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const NoHabitGoalsContainer = styled.div`
  font-size: 50px;
  animation: ${fadeInAnimation} 0.5s ease-in-out forwards;
`;
const NoHabitsContainer = styled.div`
  animation: ${fadeInAnimation} 0.5s ease-in-out forwards;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const HabitChartsLeftContainer = styled.div`
  width: 40%;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 70vh;
  align-items: center;
  margin-top: 50px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15), 0px -2px 4px rgba(0, 0, 0, 0.15),
    -2px 0px 4px rgba(0, 0, 0, 0.15), 2px 0px 4px rgba(0, 0, 0, 0.15),
    0px 2px 4px rgba(0, 0, 0, 0.15), 0px 4px 8px rgba(0, 0, 0, 0.15),
    0px 8px 16px rgba(0, 0, 0, 0.15), 0px 16px 32px rgba(0, 0, 0, 0.15),
    -2px -2px 4px rgba(0, 0, 0, 0.15), 2px -2px 4px rgba(0, 0, 0, 0.15),
    -2px 2px 4px rgba(0, 0, 0, 0.15), 2px 2px 4px rgba(0, 0, 0, 0.15);
`;
const HabitChartsRightContainer = styled.div`
  width: 40%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 70vh;
  align-items: center;
  margin-top: 50px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15), 0px -2px 4px rgba(0, 0, 0, 0.15),
    -2px 0px 4px rgba(0, 0, 0, 0.15), 2px 0px 4px rgba(0, 0, 0, 0.15),
    0px 2px 4px rgba(0, 0, 0, 0.15), 0px 4px 8px rgba(0, 0, 0, 0.15),
    0px 8px 16px rgba(0, 0, 0, 0.15), 0px 16px 32px rgba(0, 0, 0, 0.15),
    -2px -2px 4px rgba(0, 0, 0, 0.15), 2px -2px 4px rgba(0, 0, 0, 0.15),
    -2px 2px 4px rgba(0, 0, 0, 0.15), 2px 2px 4px rgba(0, 0, 0, 0.15);
`;
const LeftChartHeader = styled.p`
  font-size: 40px;
  letter-spacing: 2px;
`;
const HabitGoalCon = styled.div`
  // border-bottom: 1px solid black;
  margin-bottom: 30px;
  :last-child {
    margin-bottom: 0;
  }
  animation: ${fadeInAnimation} 0.5s ease-in-out forwards; 
  padding: 20px;
  text-align:center;
}`;
const HabitGoal = styled.div`
  padding: 30px;
  padding-left: 10px;
  display: flex;
  justify-content: space-between;
  text-align: center;
`;
const CategoryTitle = styled.div`
  font-size: 38px;
`;
const HabitsContainer = styled.div``;
const HabitCon = styled.div`
  padding: 20px;
`;
const HabitName = styled.div`
  font-size: 25px;
  letter-spacing: 1px;
`;
const HabitCounter = styled.div``;
const HabitPercent = styled.p`
  font-size: 20px;
`;
const WeekdaysContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const WeekdayBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isChecked ? "#66FF00" : "red")};
  color: white;
  margin: 5px;
`;
const ChartContainer = styled.div`
  width: 100%;
  height: 500px;
`;

const MyChartsDesktop = () => {
  const { AllGoals, setAllGoals } = useGoalsContext();
  const [habitData, setHabitData] = useState({});

  useEffect(() => {
    const goalsData = localStorage.getItem("goals");
    if (goalsData) {
      const parsedGoals = JSON.parse(goalsData);
      setAllGoals(parsedGoals);

      const updatedHabitData = {};
      parsedGoals.forEach((goal) => {
        goal.habits.forEach((habit) => {
          const checkedCount = countCheckedBoxes(habit.checkboxes);
          if (!updatedHabitData[habit.habitName]) {
            updatedHabitData[habit.habitName] = {
              data: [0, 0, 0, 0, 0, 0, 0],
              backgroundColor: "rgba(75,192,192,0.2)",
            };
          }
          const dayIndex = new Date().getDay() - 1;
          if (dayIndex >= 0) {
            updatedHabitData[habit.habitName].data[dayIndex] =
              (checkedCount / (dayIndex + 1)) * 100;
          }
        });
      });
      setHabitData(updatedHabitData);
    }
  }, []);

  const countCheckedBoxes = (checkboxes) => {
    let count = 0;
    for (const day in checkboxes) {
      if (checkboxes[day]) {
        count++;
      }
    }
    return count;
  };

  const renderWeekdays = (checkboxes) => {
    const weekdays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return weekdays.map((day, index) => (
      <WeekdayBox key={index} isChecked={checkboxes[day]}>
        {day.slice(0, 3)}
      </WeekdayBox>
    ));
  };

  const calculatePercentage = (checkedCount) => {
    return ((checkedCount / 7) * 100).toFixed(0);
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const chartData = {
    labels: daysOfWeek,
    datasets: Object.keys(habitData).map((habitName, index) => ({
      label: habitName,
      data: habitData[habitName].data,
      backgroundColor: habitData[habitName].backgroundColor,
    })),
  };

  console.log(habitData);

  return (
    <Container>
      <HeaderContainer>
        <TitleContainer>
          <Title>
            MyCharts <FaChartBar />
          </Title>
        </TitleContainer>
        <HeaderItemsContainer>
          <HeaderItem as="a" href="/habits">
            MyHabits
          </HeaderItem>
          <HeaderItem as="a" href="/">
            <FaHome />
          </HeaderItem>
        </HeaderItemsContainer>
      </HeaderContainer>
      <MainContainer>
        <HabitChartsLeftContainer>
          <LeftChartHeader>Streak</LeftChartHeader>
          {AllGoals.length === 0 ? (
            <NoHabitGoalsContainer>No Habits No Charts</NoHabitGoalsContainer>
          ) : (
            AllGoals.map((goal, index) => (
              <HabitGoalCon key={goal.name}>
                <HabitGoal>
                  <CategoryTitle>{goal.name}</CategoryTitle>
                </HabitGoal>

                <HabitsContainer>
                  {goal.habits.length === 0 ? (
                    <NoHabitsContainer>No habits here</NoHabitsContainer>
                  ) : (
                    goal.habits.map((habit, habitIndex) => {
                      const checkedCount = countCheckedBoxes(habit.checkboxes);
                      return (
                        <HabitCon key={habitIndex}>
                          <HabitName>{habit.habitName}</HabitName>
                          <WeekdaysContainer>
                            {renderWeekdays(habit.checkboxes)}
                          </WeekdaysContainer>
                          <HabitPercent>
                            {calculatePercentage(checkedCount)}%
                          </HabitPercent>
                        </HabitCon>
                      );
                    })
                  )}
                </HabitsContainer>
              </HabitGoalCon>
            ))
          )}
        </HabitChartsLeftContainer>
        <HabitChartsRightContainer>
          <ChartContainer>
            <Bar
              data={chartData}
              options={{
                indexAxis: "x",
                plugins: {
                  title: {
                    display: true,
                    text: "Habit Completion Percentage by Day of Week",
                  },
                },
                scales: {
                  x: {
                    stacked: true,
                    type: "category", // Changed to 'category'
                  },
                  y: {
                    stacked: true,
                    beginAtZero: true,
                  },
                },
              }}
            />
          </ChartContainer>
        </HabitChartsRightContainer>
      </MainContainer>
    </Container>
  );
};

export default MyChartsDesktop;
