import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

type Props = TextFieldProps & {
  name: string;
};

const Input: React.FC<Props> = ({ name, ...rest }: Props) => {
  const inputRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <TextField
      inputRef={inputRef}
      defaultValue={defaultValue}
      name={name}
      variant="outlined"
      margin="dense"
      fullWidth
      size="small"
      error={!!error}
      helperText={error || ''}
      {...rest}
    />
  );
};

export default Input;
