import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

const PdfModal = ({ isOpen, closeModal, pdfUrl }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="PDF Modal"
      className="container"
    >
      <div
        className="d-flex  flex-column justify-content-center align-items-center"
        style={{ width: '80%', margin: 'auto' }}
      >
        <div
          className="d-flex justify-content-end align-items-end "
          style={{ width: '80%' }}
        >
          <button
            type="button"
            class="btn-close text-dark fw-bold"
            aria-label="Close"
            onClick={closeModal}
          ></button>
        </div>

        <iframe
          src={pdfUrl}
          title="PDF Viewer"
          width="80%"
          height="500px"
        ></iframe>
      </div>
    </Modal>
  );
};

export default PdfModal;
