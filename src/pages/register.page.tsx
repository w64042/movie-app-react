import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../components/FormInput';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { signUpUserFn } from '../api/authApi';

const LoadingButton = styled(_LoadingButton)`
  padding: 0.6rem 0;
  background-color: #f9d13e;
  color: #2363eb;
  font-weight: 500;

  &:hover {
    background-color: #ebc22c;
    transform: translateY(-2px);
  }
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: #2363eb;
  &:hover {
    text-decoration: underline;
  }
`;

const registerSchema = object({
  name: string().min(1, 'Full name is required').max(100),
  email: string()
    .min(1, 'Email address is required')
    .email('Email Address is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const RegisterPage = () => {
  const navigate = useNavigate();

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  // 👇 Calling the Register Mutation
  const { mutate, isLoading } = useMutation(
    (userData: RegisterInput) => signUpUserFn(userData),
    {
      onSuccess(data) {
        toast.success(data?.message);
        navigate('/verifyemail');
      },
      onError(error: any) {
        if (Array.isArray((error as any).response.data.error)) {
          (error as any).response.data.error.forEach((el: any) =>
            toast.error(el.message, {
              position: 'top-right',
            })
          );
        } else {
          toast.error((error as any).response.data.message, {
            position: 'top-right',
          });
        }
      },
    }
  );

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    // 👇 Execute the Mutation
    mutate(values);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#2363eb',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          textAlign='center'
          component='h1'
          sx={{
            color: '#f9d13e',
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 600,
            mb: 2,
            letterSpacing: 1,
          }}
        >
          Witaj w Stream Generation!
        </Typography>
        <Typography component='h2' sx={{ color: '#e5e7eb', mb: 2 }}>
          Zaczynajmy!
        </Typography>

        <FormProvider {...methods}>
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            autoComplete='off'
            maxWidth='27rem'
            width='100%'
            sx={{
              backgroundColor: '#e5e7eb',
              p: { xs: '1rem', sm: '2rem' },
              borderRadius: 2,
            }}
          >
            <FormInput name='name' label='Imię i nazwisko' />
            <FormInput name='email' label='Email' type='email' />
            <FormInput name='password' label='Hasło' type='password' />
            <FormInput
              name='passwordConfirm'
              label='Potwierdź hasło'
              type='password'
            />
            <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
              Masz już konto?{' '}
              <LinkItem to='/login'>Zaloguj się</LinkItem>
            </Typography>

            <LoadingButton
              variant='contained'
              sx={{ mt: 1 }}
              fullWidth
              disableElevation
              type='submit'
              loading={isLoading}
            >
              Wchodzę w to!
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default RegisterPage;
