import { useFormik } from "formik";
import { Container, Form, Row } from "react-bootstrap";
import { register } from "./auth-service";

const Register: React.FC<unknown> = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: ({ username, password }) => {
      register(username, password).then(({ token }) =>
        sessionStorage.setItem("token", token)
      );
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
          <br />
          <input type="submit" className="btn btn-primary" />
        </Form>
      </Row>
    </Container>
  );
};

export default Register;
