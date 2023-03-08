import { Paper, Grid, TextField, Button } from '@mui/material';
import React, { useContext } from 'react';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import ActiveUserContext from '../../../Contexts/ActiveUserContext';
import alertService from "../../../Services/AlertService";

const validationSchema = Yup.object().shape({
  email: Yup.string(),
  password: Yup.string(),
});

const Login = () => {

  const btnstyle = { margin: '8px 0' };
  const navigate = useNavigate();
  const { login } = useContext(ActiveUserContext);

  const handleSubmit = (values: { email: string; password: string }) => {
    login(values.email.toLowerCase(), values.password)
      .then(() => {
        console.log(values);

        navigate('/home');
      })
      .catch((error) => {
        if (
          (typeof error.response !== 'undefined' &&
            error.response.status === 401) ||
          error.response.status === 403
        ) {
         alertService.error("Login failed! Try Again.")
        }
      });
  };
  return (
    <Grid>
      <Paper elevation={10} className={"paper"} >
        <Grid>
          <h2>Sign In</h2>
        </Grid>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange
          isInitialValid
        >
          {(props) => (
            <Form id={"form"} onSubmit={props.handleSubmit}>
              <TextField
                label='email'
                id='email'
                placeholder='Enter username'
                fullWidth
                required
                autoFocus
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
              />
              {props.errors.email && (
                <div id='feedback'>{props.errors.email}</div>
              )}
              <br/>
              <br/>
              <TextField
                id='password'
                label='password'
                placeholder='Enter password'
                type='password'
                fullWidth
                required
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
              />
              {props.errors.password && (
                <div id='feedback'>{props.errors.password}</div>
              )}
              <br/>
              <br/>
              <Button
                type='submit'
                color='primary'
                variant='contained'
                style={btnstyle}
                fullWidth
              >
                Sign in
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Login;
