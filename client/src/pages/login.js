import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { useForm } from '../utility/hooks';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Stack, Alert } from '@mui/material';

const LOGIN_USER = gql`
  mutation LoginUser($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      email
      username
      token
    }
  }
`;

const Login = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const loginUserCallback = () => {
    console.log('Callback hit');
    loginUser();
  };

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: '',
    password: '',
  });

  const { email, password } = values;

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { loginUser: userData } }) {
      context.login(userData);
      navigate('/');
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: {
      loginInput: { email, password },
    },
  });

  return (
    <Container spacing={2} maxWidth="sm" align="left">
      <h3>Login</h3>
      <p>This is the login page, register below to sign in your account!</p>

      <Stack spacing={2} paddingBottom={2}>
        <TextField
          size="small"
          label="Email"
          name="email"
          onChange={onChange}
        />
        <TextField
          size="small"
          label="Password"
          name="password"
          onChange={onChange}
        />
      </Stack>
      {errors.map((error, index) => (
        <Alert key={index} severity="error">
          {error.message}
        </Alert>
      ))}
      <Button variant="contained" onClick={onSubmit}>
        Login
      </Button>
    </Container>
  );
};

export default Login;
