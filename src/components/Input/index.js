import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import TextField, { BaseTextFieldProps } from '@material-ui/core/TextField';

// interface InputProps extends BaseTextFieldProps {
//   name: string;
// }

const Input = ({ name, ...rest }) => {
  console.log(name);
  const inputRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(
    name.toString(),
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <TextField
        inputRef={inputRef}
        defaultValue={defaultValue}
        name={name.toString()}
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!error}
        helperText={error || ''}
        {...rest}
      />
    </>
  );
};

export default Input;
