import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

function ImageModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Link
        onClick={handleShow}
        style={{ textDecoration: 'none', color: '#274dd6' }}
      >
        Bill Proof
      </Link>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Image of the Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Link to={props.src} target="blank">
            <img src={props.src} alt="bill proof" className="img-fluid" />
          </Link>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ImageModal;
