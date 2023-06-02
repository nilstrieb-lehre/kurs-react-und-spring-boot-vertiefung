import { Button } from "react-bootstrap";
import { useCallback } from "react";
import ButtonWithModalForm, { CloseAction } from "./ButtonWithModalForm";
import FormTextField from "./FormTextField";

const initialValues = { id: "" };
type FormValues = { id: string };

function validate(values: FormValues): Record<string, string> {
  if (!values.id) {
    return { id: "Required" };
  }
  return {};
}

const JoinListModal: React.FC<{
  onSubmit: (id: string) => void;
}> = ({ onSubmit }) => {
  const onAction = useCallback(
    (action: CloseAction<FormValues>) => {
      if (action.type === "cancel") {
        return;
      }

      onSubmit(action.values.id);
    },
    [onSubmit]
  );

  return (
    <ButtonWithModalForm<FormValues>
      initialValues={initialValues}
      onAction={onAction}
      validate={validate}
      renderButton={(onClick) => (
        <Button variant="outline-primary" onClick={onClick}>
          join list
        </Button>
      )}
      renderBody={() => (
        <>
          <FormTextField
            controlId="formikListJoinId"
            label="ID"
            placeholder="eg. 0000000000"
            name="id"
          />
        </>
      )}
    />
  );
};

export default JoinListModal;
