import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Modal } from "react-responsive-modal";

const InnerUpdateGoalButton = styled.div`
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
  border-radius: 2px;
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

const UpdateGoalButton = ({ initialGoal, onGoalUpdated }) => {
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [goalName, setGoalName] = useState("");

  useEffect(() => {
    if (initialGoal) {
      setGoalName(initialGoal.name || "");
    }
  }, [initialGoal]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowError(false);
    setShowModal(false);
  };

  const handleUpdate = () => {
    if (!goalName) {
      setShowError(true);
      return;
    } else {
      const localGoals = JSON.parse(localStorage.getItem("goals")) || [];
      const updatedGoals = localGoals.map((goal) => {
        if (goal.id === initialGoal.id) {
          return { ...goal, name: goalName };
        }
        return goal;
      });

      localStorage.setItem("goals", JSON.stringify(updatedGoals));

      setShowError(false);
      closeModal();
      onGoalUpdated(updatedGoals);
    }
  };

  return (
    <>
      <InnerUpdateGoalButton onClick={openModal}>
        <img src="images/edit.png" alt="edit-goal-btn" />
      </InnerUpdateGoalButton>
      <Modal open={showModal} onClose={closeModal} center>
        <ModalContentContainer>
          <ModalTitle>Edit category</ModalTitle>
          <InputSection>
            <label htmlFor="editGoal">Edit Category Name</label>
            {showError && <ErrorSection>Enter a goal name</ErrorSection>}
            <input
              type="text"
              id="goalName"
              spellCheck="false"
              placeholder="Category Name"
              maxLength="50"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
            />
          </InputSection>
          <ButtonContainer>
            <SubmitButton onClick={handleUpdate}>Update Category</SubmitButton>
          </ButtonContainer>
        </ModalContentContainer>
      </Modal>
    </>
  );
};

export default UpdateGoalButton;
