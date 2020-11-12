import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import ReactInputMask, { Props as InputProps } from 'react-input-mask';

interface Props extends InputProps {
  name: string;
}

// type Props = TextFieldProps & {
//   name: string;
// };

const InputMask: React.FC<Props> = ({ name, ...rest }: Props) => {
  const inputRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref: any) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <ReactInputMask name={name} {...rest}>
      {() => (
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
          // {...rest}
        />
      )}
    </ReactInputMask>
  );
};

export default InputMask;
