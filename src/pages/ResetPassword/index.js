import React, { useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Input from '../../components/Input';

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

const ResetPassword = () => {
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
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      history.pushState('/dashboard')

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
    <>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Recuperação de Senha
      </Typography>

      <Form ref={formRef} onSubmit={handleSubmit} className={classes.form}>
        <Input name="email" id="email" label="E-mail" autoFocus />

        <Input
          name="password"
          id="password"
          label="Nova Senha"
          type="password"
          autoComplete="current-password"
        />

       <Input
          name="password"
          id="password"
          label="Repita Nova Senha"
          type="password"
          autoComplete="current-password"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Salvar
        </Button>
      </Form>
    </>
  );
};

export default ResetPassword;
