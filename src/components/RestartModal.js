import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useSetMoves } from "../contexts/movesContext";
import { useSetInitialPlayers } from "../contexts/initialPlayersContext";
import { useSetScreen } from "../contexts/screenContext";

function RestartModal({ show, setShow }) {
  const setInitialPlayers = useSetInitialPlayers();
  const setScreen = useSetScreen();
  const setMoves = useSetMoves();

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Potwierdzenie</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Czy na pewno chcesz zacząć od początku?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setShow(false);
            setInitialPlayers(null);
            setMoves([]);
            setScreen("start");
          }}
        >
          Tak
        </Button>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Nie
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RestartModal;
