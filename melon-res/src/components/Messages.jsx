import Modal from 'react-bootstrap/Modal';
export default function Messages({message, isOpen, hideModal}){
   
    return (
      <Modal show={isOpen}>
        <Modal.Header closeButton onClick={hideModal}>Melon Tasting</Modal.Header>
        <Modal.Body>{message}</Modal.Body>
      </Modal>
    )
  }