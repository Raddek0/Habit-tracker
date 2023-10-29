import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "react-responsive-modal";

const InnerAddHabitButton = styled.div`
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

const AddHabitButton = ({ goalId, onHabitAdded }) => {
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [habitName, setHabitName] = useState("");

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowError(false);
    setShowModal(false);
    setHabitName("");
  };

  const handleSubmit = () => {
    if (!habitName) {
      setShowError(true);
      return;
    } else {
      const newHabitData = {
        habitName: habitName,
        checkboxes: {
          Monday: false,
          Tuesday: false,
          Wednesday: false,
          Thursday: false,
          Friday: false,
          Saturday: false,
          Sunday: false,
        },
      };

      onHabitAdded(newHabitData, goalId);

      setShowError(false);
      setShowModal(false);
      setHabitName("");
    }
  };

  return (
    <>
      <InnerAddHabitButton onClick={openModal}>
        <img src="images/add.png" alt="add-goal-btn"></img>
        Add a habit
      </InnerAddHabitButton>
      <Modal open={showModal} onClose={closeModal} center>
        <ModalContentContainer>
          <ModalTitle>Create a new habit</ModalTitle>
          <InputSection>
            <label htmlFor="createGoal">Enter Habit Name</label>
            {showError && <ErrorSection>Enter a habit name</ErrorSection>}
            <input
              type="text"
              id="goalName"
              spellCheck="false"
              placeholder="Goal Name"
              maxLength="50"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
            />
          </InputSection>
          <ButtonContainer>
            <SubmitButton type="submit" onClick={handleSubmit}>
              Add Habit
            </SubmitButton>
          </ButtonContainer>
        </ModalContentContainer>
      </Modal>
    </>
  );
};

export default AddHabitButton;
