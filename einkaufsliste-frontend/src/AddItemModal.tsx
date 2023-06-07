import { Button } from "react-bootstrap";
import { Product } from "./shopping-list-service";
import { useCallback } from "react";
import FormTextField from "./FormTextField";
import ButtonWithModalForm, { CloseAction } from "./ButtonWithModalForm";

const initialValues = {
  name: "",
  requester: "",
  location: "",
  quantity: "",
};

type FormValues = Omit<Product, "id" | "completed">;

function validate(values: FormValues): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const prop of ["name", "requester", "location", "quantity"]) {
    if (!values[prop as keyof FormValues]) {
      errors[prop] = "Required";
    }
  }
  return errors;
}

const AddItemModal: React.FC<{
  onAdd: (product: Product) => void;
}> = ({ onAdd }) => {
  const onAction = useCallback(
    (action: CloseAction<FormValues>) => {
      if (action.type === "cancel") {
        return;
      }

      const product: Product = {
        ...action.values,
        id: "",
        completed: false,
      };
      onAdd(product);
    },
    [onAdd]
  );

  return (
    <ButtonWithModalForm<FormValues>
      initialValues={initialValues}
      onAction={onAction}
      validate={validate}
      renderButton={(onClick) => (
        <Button variant="outline-primary" onClick={onClick}>
          add item
        </Button>
      )}
      renderBody={() => (
        <>
          <FormTextField
            controlId="formikProductName"
            label="Name"
            placeholder="eg. apples"
            name="name"
          />
          <FormTextField
            controlId="formikProductRequester"
            label="Requester"
            placeholder="eg. Hans-Peter"
            name="requester"
          />
          <FormTextField
            controlId="formikProductLocation"
            label="Location"
            placeholder="eg. Migros"
            name="location"
          />
          <FormTextField
            controlId="formikProductQuantity"
            label="Quantity"
            placeholder="eg. 2kg"
            name="quantity"
          />
        </>
      )}
    />
  );
};

export default AddItemModal;
