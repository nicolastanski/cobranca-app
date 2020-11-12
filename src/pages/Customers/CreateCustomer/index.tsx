import React, { useState, useRef } from 'react';
import * as Yup from 'yup';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Input from '../../../components/Input';
import InputMask from '../../../components/InputMask';

const CreateCustomer: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [age, setAge] = useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    setAge(event.target.value as string);
  };

  interface FormData {
    cnpjCpf: string;
    companyName: string;
  }

  interface YupErrors {
    [key: string]: string;
  }

  const handleSubmit = async (data: FormData): Promise<void> => {
    console.log(data);

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        cnpj_cpf: Yup.string().required('CNPJ/CPF é obrigatório'),
        company_name: Yup.string().required('Razão Social é obrigatório'),
        fantasy_name: Yup.string().required('Nome Fantasia é obrigatório'),
        address: Yup.string().required('Enredeço é obrigatório'),
        city: Yup.string().required('Cidade é obrigatório'),
        state: Yup.string().required('Estado é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const validationErrors = {} as YupErrors;
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      }
    }
  };

  return (
    <FormControl fullWidth>
      <Form ref={formRef} onSubmit={handleSubmit}>
        {/* Register */}
        <Grid container spacing={1}>
          <Grid item xs={12} sm={2}>
            <Input name="cnpj_cpf" label="CPF/CNPJ" type="text" />
          </Grid>

          <Grid item xs={12} sm={5}>
            <Input name="company_name" label="Razão Social" type="text" />
          </Grid>

          <Grid item xs={12} sm={5}>
            <Input name="fantasy_name" label="Nome Fantasia" type="text" />
          </Grid>

          <Grid item xs={12} sm={2}>
            <Input
              name="state_register"
              label="Inscrição Estatual"
              type="text"
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <Input name="zip_code" label="CEP" type="text" />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Input name="address" label="Endereço" type="text" />
          </Grid>
          <Grid item xs={6} sm={2}>
            <Input name="number" id="number" label="Número" type="text" />
          </Grid>
          <Grid item xs={6} sm={2}>
            <Input name="complement" label="CJ" type="text" />
          </Grid>

          <Grid item xs={4} sm={3}>
            <Input name="neighborhood" label="Bairro" type="text" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input name="city" label="Cidade" type="text" />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Input name="state" label="Estado" type="text" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input name="website" id="website" label="Site" type="text" />
          </Grid>

          {/* Contacts */}
          {/* <Grid item xs={12} sm={12}>
            <Typography component="h2" variant="h6">
              Contatos
            </Typography>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Input name="name" label="Nome" type="text" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input name="cargo" label="Cargo" type="text" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input name="email" label="E-mail" type="text" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input name="cellphone" label="Celular" type="text" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input name="phone" id="phone" label="Telefone" type="text" />
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" color="primary">
              +
            </Button>
          </Grid> */}

          {/* Contract */}

          <Grid item xs={12} sm={12}>
            <Typography component="h2" variant="h6">
              Contrato
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input name="bank" label="Executivo" type="text" />
          </Grid>

          <Grid item xs={12} sm={3}>
            <Input name="agency" label="Tipo Contrato" type="text" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input name="account" label="Taxa Contratual" type="text" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input name="account" label="Taxa de Juros" type="text" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input
              name="account"
              label="Comissões pagamento direto"
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input name="account" label="Prazo Contratual" type="text" />
          </Grid>

          {/* Bank */}
          <Grid item xs={12} sm={12}>
            <Typography component="h2" variant="h6">
              Banco
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input name="bank" label="Banco" type="text" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input name="agency" label="Agência" type="text" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input name="account" label="Conta Corrente" type="text" />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Form>
    </FormControl>
  );
};

export default CreateCustomer;
