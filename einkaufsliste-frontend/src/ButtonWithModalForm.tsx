import { Formik, FormikValues } from "formik";
import { useCallback, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export type CloseAction<T> = { type: "cancel" } | { type: "submit"; values: T };

function ButtonWithModalForm<T extends FormikValues>({
  initialValues,
  onAction,
  validate,
  renderButton,
  renderBody,
}: {
  initialValues: T;
  onAction: (action: CloseAction<T>) => void;
  validate: (values: T) => Record<string, string>;
  renderButton: (onClick: () => void) => JSX.Element;
  renderBody: () => JSX.Element;
}) {
  const [show, setShow] = useState(false);

  const onClick = useCallback(() => setShow(true), [setShow]);

  const onCancel = useCallback(() => {
    setShow(false);
    onAction({ type: "cancel" });
  }, [setShow, onAction]);

  const onSubmit = useCallback(
    (values: T) => {
      setShow(false);
      onAction({ type: "submit", values });
    },
    [setShow, onAction]
  );

  return (
    <>
      {renderButton(onClick)}
      <Modal show={show} onHide={onCancel}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={validate}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Modal.Header>
                <Modal.Title>Add item</Modal.Title>
              </Modal.Header>

              <Modal.Body>{renderBody()}</Modal.Body>

              <Modal.Footer>
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="confirm"
                ></input>
                <Button variant="danger" onClick={onCancel}>
                  cancel
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default ButtonWithModalForm;
