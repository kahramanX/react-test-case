import React from "react";
import Modal from "react-modal";

export default function DateModal({
  modalIsOpen,
  customStylesForModal,
  storeBookingInfos,
}) {
  return (
    <Modal
      isOpen={modalIsOpen}
      style={customStylesForModal}
      contentLabel="Modal"
    >
      <h3>Takvimde tarih aralığı seçildi!</h3>
      <br />
      <h4>Bİlgiler;</h4>
      <hr />
      <div>
        <strong>Start Date:</strong> {storeBookingInfos.startDate}
        <br />
        <strong>End Date:</strong> {storeBookingInfos.endDate}
      </div>
      <button onClick={() => window.location.reload()}>Tekrar Tarih Seç</button>
    </Modal>
  );
}
