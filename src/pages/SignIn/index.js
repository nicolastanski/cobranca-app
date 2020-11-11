import React, { useRef } from 'react';
import * as Yup from 'yup';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Input from '../../components/Input';

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    <Link color="inherit" href="https://tanski.com.br">
      {`${new Date().getFullYear()} © Cobrança App`}
    </Link>
  </Typography>
);

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// interface FormData {
//   email: string;
//   password: string;
// }

// type Errors = {
//   [key: string]: string;
// };

const SignIn = () => {
  const formRef = useRef(null);
  const classes = useStyles();

  const handleSubmit = async data => {
    console.log(data);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Informe um e-mail válido')
          .required('E-email obrigatório'),
        password: Yup.string().min(6).required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log(data);
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Form ref={formRef} onSubmit={handleSubmit} className={classes.form}>
          <Input name="email" id="email" label="E-mail" autoFocus />

          <Input
            name="password"
            id="password"
            label="Senha"
            type="password"
            autoComplete="current-password"
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembrar"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#asb" variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>
          </Grid>
        </Form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignIn;
