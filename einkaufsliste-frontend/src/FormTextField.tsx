import { Field } from "formik";
import { Form } from "react-bootstrap";

// https://codesandbox.io/s/react-bootstrap-formik-pb831?file=/src/form-field.js:228-1050
const FormTextField: React.FC<{
  name: string;
  label: string;
  controlId: string;
  placeholder: string;
}> = ({ name, label, controlId, placeholder }) => (
  <Field name={name}>
    {({ field, form }: any) => {
      const isValid = !form.errors[field.name];
      const isInvalid = form.touched[field.name] && !isValid;
      return (
        <Form.Group controlId={controlId}>
          <Form.Label>{label}</Form.Label>
          <Form.Control
            {...field}
            type="text"
            placeholder={placeholder}
            isValid={form.touched[field.name] && isValid}
            isInvalid={isInvalid}
            feedback={form.errors[field.name]}
          />
          {
            <Form.Control.Feedback type="invalid">
              {form.errors[field.name]}
            </Form.Control.Feedback>
          }
        </Form.Group>
      );
    }}
  </Field>
);

export default FormTextField;
