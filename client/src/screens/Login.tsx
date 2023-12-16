import { Box, Button, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { object, string, SchemaOf } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { setLoginSuccess } from '../redux/accountSlice';
import { styles, fontSizes } from '../components/shared/styles';
import { Input } from '../components/shared/Input';
import { REQUIRED, SIGN_IN, SIGN_UP, WRONG_EMAIL } from '../shared/constants';
import { RegisterOrLogIn } from '../components/register/RegisterOrLogin';
import { Login as LoginValues } from '../shared/types';
import { postLogin } from '../api/auth';
import { CompanyLogo } from '../components/shared/CompanyLogo';

const loginSchema: SchemaOf<LoginValues> = object().shape({
  email: string().email(WRONG_EMAIL).required(REQUIRED),
  password: string().required(REQUIRED),
});

export function Login() {
  const { handleSubmit, control } = useForm<LoginValues>({
    resolver: yupResolver(loginSchema),
  });

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = handleSubmit(async (data) => {
    postLogin({ email: data.email, password: data.password }).then(() => {
      dispatch(setLoginSuccess(true));

      if (
        location?.state?.prevPath &&
        location?.state?.prevPath === '/stripe/checkout'
      )
        navigate('/stripe/checkout');
      else navigate('/');
    });
  });

  return (
    <Box
      height="90vh"
      marginX={10}
      display="flex"
      flexDirection="column"
      marginTop={5}
    >
      <CompanyLogo />
      <form onSubmit={onSubmit} className={styles.inputContainer}>
        <Typography fontSize={fontSizes.large}>Welcome back</Typography>
        <Input name="email" control={control} placeholder="Email" />
        <Input
          name="password"
          control={control}
          placeholder="Password"
          type="password"
        />
        <Button
          onClick={onSubmit}
          variant="contained"
          sx={{ paddingBlock: '1em' }}
        >
          {SIGN_IN}
        </Button>
      </form>
      <Link
        to="/forgotpassword"
        className={styles.inputContainer}
        style={{ textDecoration: 'none', color: 'black', marginBlock: '1rem' }}
      >
        <Typography fontSize={fontSizes.medium}> Forgot password?</Typography>
      </Link>
      <RegisterOrLogIn
        screenName="/account/register"
        buttonName={SIGN_UP}
        title="Not registered?"
      />
    </Box>
  );
}
