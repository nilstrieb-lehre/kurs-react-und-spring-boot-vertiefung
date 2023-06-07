import { useFormik } from "formik";
import { Alert, Container, Form, Row } from "react-bootstrap";
import { login } from "./auth-service";
import { useState } from "react";

const Login: React.FC<{ setToken: (token: string) => void }> = ({
  setToken,
}) => {
  const [hasErrors, setHasErrors] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: ({ username, password }) => {
      login(username, password).then((res) => {
        if (res === null) {
          setHasErrors(true);
        } else {
          setHasErrors(false);
          setToken(res.token);
        }
      });
    },
  });

  return (
    <Container>
      <Row>
        <h1>Login</h1>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="loginUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              placeholder="Enter username"
              type="text"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
          </Form.Group>
          <Form.Group controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="Enter password"
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </Form.Group>
          {hasErrors && (
            <Alert variant="danger">Invalid username or password</Alert>
          )}
          <br />
          <input type="submit" className="btn btn-primary" />
        </Form>
      </Row>
    </Container>
  );
};

export default Login;
