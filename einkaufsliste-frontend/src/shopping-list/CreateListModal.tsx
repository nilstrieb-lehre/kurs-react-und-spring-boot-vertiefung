import { Button } from "react-bootstrap";
import { useCallback } from "react";
import ButtonWithModalForm, { CloseAction } from "./ButtonWithModalForm";
import FormTextField from "./FormTextField";

const initialValues = { name: "" };
type FormValues = { name: string };

function validate(values: FormValues): Record<string, string> {
  if (!values.name) {
    return { name: "Required" };
  }
  return {};
}

const CreateListModal: React.FC<{
  onSubmit: (name: string) => void;
}> = ({ onSubmit }) => {
  const onAction = useCallback(
    (action: CloseAction<FormValues>) => {
      if (action.type === "cancel") {
        return;
      }

      onSubmit(action.values.name);
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
          create new list
        </Button>
      )}
      renderBody={() => (
        <>
          <FormTextField
            controlId="formikListCreateName"
            label="Name"
            placeholder="eg. My Shopping List"
            name="name"
          />
        </>
      )}
    />
  );
};

export default CreateListModal;
