import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "react-responsive-modal";

const InnerDeleteHabitButton = styled.div`
  text-transform: uppercase;
  display: flex;
  align-items: center;
  img {
    max-width: 22px;
  }
  cursor: pointer;
`;

const ModalContentContainer = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
`;

const ModalTitle = styled.div`
  font-size: 20px;
  margin-bottom: 30px;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const ModalSubmitButton = styled.div`
  padding: 8px;
  margin-right: 20px;
  background-color: #9da631;
  color: white;
  cursor: pointer;
  border-radius: 8px;
`;

const ModalCancelButton = styled.div`
  background-color: red;
  color: white;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
`;

const DeleteHabitButton = ({ goalId, habitName, onHabitDeleted }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleDelete = () => {
    onHabitDeleted(goalId, habitName);

    closeModal();
  };

  return (
    <>
      <InnerDeleteHabitButton onClick={openModal}>
        <img src="images/delete.png" alt="delete-habit-btn" />
      </InnerDeleteHabitButton>
      <Modal open={showModal} onClose={closeModal} center>
        <ModalContentContainer>
          <ModalTitle>Are you sure you want to delete this habit?</ModalTitle>
          <ModalButtonContainer>
            <ModalSubmitButton onClick={handleDelete}>
              Yes, Delete
            </ModalSubmitButton>
            <ModalCancelButton onClick={closeModal}>Cancel</ModalCancelButton>
          </ModalButtonContainer>
        </ModalContentContainer>
      </Modal>
    </>
  );
};

export default DeleteHabitButton;
