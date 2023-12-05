import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../components/FormInput';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getMeFn, loginUserFn } from '../api/authApi';
import { useStateContext } from '../context';

const LoadingButton = styled(_LoadingButton)`
  padding: 0.6rem 0;
  background-color: #1b1b1b;
  color: #f1f1f1;
  font-weight: 500;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #1b1b1b;
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

const loginSchema = object({
  username: string()
    .min(1, 'Email jest wymagany')
    .email('Email jest niepoprawny'),
  password: string()
    .min(1, 'Hasło jest wymagane'),
  grant_type: string(),
  client_id: string(),
  client_secret: string(),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = ((location.state as any)?.from.pathname as string) || '/';

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const stateContext = useStateContext();

  // API Get Current Logged-in user
  const query = useQuery(['authUser'], getMeFn, {
    enabled: false,
    select: (data) => data.data.user,
    retry: 1,
    onSuccess: (data) => {
      stateContext.dispatch({ type: 'SET_USER', payload: data });
    },
  });

  // API Login Mutation
  const { mutate: loginUser, isLoading } = useMutation(
    (userData: LoginInput) => loginUserFn(userData),
    {
      onSuccess: (data) => {        
        query.refetch();
        localStorage.setItem('access_token', data.access_token);
        
        toast.success('You successfully logged in');
        navigate(from);
      },
      onError: (error: any) => {
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

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    // Executing the loginUser Mutation
    loginUser(values);

  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#1b1b1b',
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
            color: '#F2F2F2',
            fontWeight: 600,
            fontSize: { xs: '3rem', md: '3.5rem' },
            mb: 1,
            letterSpacing: 4,
          }}
        >
          Dobrze Cię widzieć 👋
        </Typography>
        <Typography
          variant='subtitle1'
          component='h2'
          sx={{ color: '#F2F2F2', mb: 1 }}
        >
          Przejdźmy do logowania
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
              backgroundColor: '#B1EDE8',
              p: { xs: '1rem', sm: '2rem' },
              borderRadius: 2,
            }}
          >
            <FormInput name='username' label='Email' type='email' placeholder='Podaj swój email' />
            <FormInput name='password' label='Hasło' type='password' placeholder='Podaj hasło' />
            <FormInput name='grant_type' type='hidden' />
            <FormInput name='client_id' type='hidden' />
            <FormInput name='client_secret' type='hidden' />

            <Typography
              sx={{ fontSize: '1rem', mb: '1.125rem', textAlign: 'left' }}
            >
              <LinkItem to='/' style={{ color: '#333' }}>
                Zapomniałeś hasła?
              </LinkItem>
            </Typography>

            <LoadingButton
              variant='contained'
              sx={{ mt: 1 }}
              fullWidth
              disableElevation
              type='submit'
              loading={isLoading}
            >
              Wchodzę!
            </LoadingButton>

            <Typography sx={{ fontSize: '0.9rem', mt: '1rem' }}>
              Nie masz konta? <LinkItem to='/register'>Zarejestruj się</LinkItem>
            </Typography>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default LoginPage;
