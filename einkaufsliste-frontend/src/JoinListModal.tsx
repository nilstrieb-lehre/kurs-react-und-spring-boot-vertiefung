import { Button, Form, Modal } from "react-bootstrap";
import { FormEvent } from "react";
import { useCallback } from "react";

export type CloseAction = { type: "cancel" } | { type: "join"; id: string };

const JoinListModal: React.FC<{
  show: boolean;
  onClose: (action: CloseAction) => void;
}> = ({ show, onClose }) => {
  const createList = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const form = e.nativeEvent.target as HTMLFormElement;

      const elems = form.elements as unknown as {
        [name: string]: { value: string };
      };
      const id = elems["listId"].value;

      if (!id) {
        return;
      }

      onClose({ type: "join", id });
    },
    [onClose]
  );

  const cancel = useCallback(() => onClose({ type: "cancel" }), [onClose]);

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={cancel}>
        <Form onSubmit={createList}>
          <Modal.Header>
            <Modal.Title>Add item</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group controlId="listId">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" placeholder="eg. 0000000000" />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <input
              type="submit"
              className="btn btn-primary"
              value="confirm"
            ></input>
            <Button variant="danger" onClick={cancel}>
              cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default JoinListModal;
