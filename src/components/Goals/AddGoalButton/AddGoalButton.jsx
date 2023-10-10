import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "react-responsive-modal";

const InnerAddGoalButton = styled.div`
  text-transform: uppercase;
  display: flex;
  align-items: center;
  img {
    max-width: 16px;
    margin-right: 8px;
  }
  cursor: pointer;
`;

const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 375px;
`;

const ModalTitle = styled.div`
  font-size: 30px;
  margin-bottom: 20px;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  label {
    margin-bottom: 5px;
  }
  input {
    padding: 5px;
    border: 2px solid #e3e3e3;
    :focus {
      outline: 2px solid #9da631;
      border: none;
    }
  }
`;
const ErrorSection = styled.div`
  color: red;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 15px;
`;
const SubmitButton = styled.div`
  background-color: #9da631;
  border: none;
  border-radius: 8px;
  padding: 8px 10px;
  color: white;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  :focus {
    outline: none;
    border: none;
  }
`;

const AddGoalButton = ({ onGoalAdded }) => {
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [goalName, setGoalName] = useState("");

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowError(false);
    setShowModal(false);
  };
  const handleSubmit = () => {
    if (!goalName) {
      setShowError(true);
      return;
    } else {
      const localGoals = JSON.parse(localStorage.getItem("goals")) || [];
      // const habitData = {
      //   habitName: null,
      //   checkboxes: {
      //     Monday: null,
      //     Tuesday: null,
      //     Wednesday: null,
      //     Thursday: null,
      //     Friday: null,
      //     Saturday: null,
      //     Sunday: null,
      //   },
      // };
      const newGoal = {
        id: localGoals.length,
        name: goalName,
        habits: [],
        // habits: habitData,
      };

      localGoals.push(newGoal);
      localStorage.setItem("goals", JSON.stringify(localGoals));

      setShowError(false);
      setShowModal(false);
      setGoalName("");

      onGoalAdded(newGoal);
    }
  };

  return (
    <>
      <InnerAddGoalButton onClick={openModal}>
        <img src="images/add.png" alt="add-goal-btn"></img>
        Add a category
      </InnerAddGoalButton>
      <Modal open={showModal} onClose={closeModal} center>
        <ModalContentContainer>
          <ModalTitle>Create a new category</ModalTitle>
          <InputSection>
            <label htmlFor="createGoal">Enter Category Name</label>
            {showError && <ErrorSection>Enter a category name</ErrorSection>}
            <input
              type="text"
              id="goalName"
              spellCheck="false"
              placeholder="Goal Name"
              maxLength="50"
              onChange={(e) => setGoalName(e.target.value)}
            />
          </InputSection>
          <ButtonContainer>
            <SubmitButton type="submit" onClick={handleSubmit}>
              Add Category
            </SubmitButton>
          </ButtonContainer>
        </ModalContentContainer>
      </Modal>
    </>
  );
};

export default AddGoalButton;
