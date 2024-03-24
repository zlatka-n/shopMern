import { useFormState } from 'react-dom';
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setLoginSuccess } from '../redux/accountSlice';
import { styles, fontSizes } from '../components/shared/styles';
import { REQUIRED, SIGN_IN, SIGN_UP } from '../shared/constants';
import { RegisterOrLogIn } from '../components/register/RegisterOrLogin';
import { postLogin } from '../api/auth';
import { CompanyLogo } from '../components/shared/CompanyLogo';

const handleSubmit = async (
  previousState: string | undefined | null,
  formData: FormData
) => {
  const userName = formData.get('userName');
  const password = formData.get('password');

  return {
    userName: userName?.toString(),
    password: password?.toString(),
    isInvalid: {
      userName: !userName,
      password: !password,
    },
  };
};

export function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, formAction] = useFormState(handleSubmit, {
    userName: null,
    password: null,
    isInValid: {
      userName: true,
      password: true,
    },
  });

  useEffect(() => {
    const { userName, password } = state;

    if (userName && password) {
      postLogin({ email: userName, password: password as string }).then(() => {
        dispatch(setLoginSuccess(true));

        if (
          location?.state?.prevPath &&
          location?.state?.prevPath === '/stripe/checkout'
        ) {
          navigate('/stripe/checkout');
        } else navigate('/');
      });
    }
  }, [state]);

  return (
    <Box
      height="90vh"
      marginX={10}
      display="flex"
      flexDirection="column"
      marginTop={5}
    >
      <CompanyLogo />
      <form action={formAction} className={styles.inputContainer}>
        <TextField name="userName" variant="outlined" label="Email" />
        {state.isInvalid?.userName && (
          <Typography color="error">{REQUIRED}</Typography>
        )}
        <TextField
          name="password"
          variant="outlined"
          type="password"
          label="Password"
        />
        {state.isInvalid?.password && (
          <Typography color="error">{REQUIRED}</Typography>
        )}
        <Button type="submit" variant="contained" sx={{ paddingBlock: '1em' }}>
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
