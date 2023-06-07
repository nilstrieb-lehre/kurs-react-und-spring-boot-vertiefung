import { useFormik } from "formik";
import { Alert, Container, Form, Row } from "react-bootstrap";
import { register } from "./auth-service";
import { useState } from "react";

const Register: React.FC<{ setToken: (token: string) => void }> = ({
  setToken,
}) => {
  const [hasError, setHasError] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: ({ username, password }) => {
      register(username, password).then((res) => {
        if (res === "username-exists-already") {
          setHasError(true);
        } else {
          setHasError(false);
          setToken(res.token);
        }
      });
    },
  });

  return (
    <Container>
      <Row>
        <h1>Register</h1>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="registerUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              placeholder="Enter username"
              type="text"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
          </Form.Group>
          <Form.Group controlId="registerPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="Enter password"
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </Form.Group>
          {hasError && <Alert variant="danger">username already exists</Alert>}
          <br />
          <input type="submit" className="btn btn-primary" />
        </Form>
      </Row>
    </Container>
  );
};

export default Register;
