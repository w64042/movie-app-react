import {
  FormHelperText,
  Typography,
  FormControl,
  Input as _Input,
  InputProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const Input = styled(_Input)`
  background-color: white;
  padding: 0.4rem 0.7rem;
  margin-bottom: 0.5rem;
`;

type IFormInputProps = {
  name: string;
  label?: string;
} & InputProps;

const FormInput: FC<IFormInputProps> = ({ name, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue=''
      name={name}
      render={({ field }) => (
        <FormControl fullWidth sx={{ mb: 2 }}>
  
          <Input
            {...field}
            fullWidth
            disableUnderline
            error={!!errors[name]}
            {...otherProps}
          />
          <FormHelperText error={!!errors[name] as boolean}>
            {errors[name] ? errors[name]?.message as string : ''}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormInput;
