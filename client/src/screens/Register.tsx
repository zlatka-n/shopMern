import { useForm } from 'react-hook-form';
import {
  Alert, Box, Button, Typography,
} from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Input } from '../components/shared/Input';
import { styles } from '../components/shared/styles';
import {
  SIGN_UP, SIGN_IN, WRONG_EMAIL, REQUIRED,
} from '../shared/constants';
import { RegisterOrLogIn } from '../components/register/RegisterOrLogin';
import { SignUp } from '../shared/types';
import { postSignUp } from '../api/auth';
import { passwordSchema } from '../shared/schemas';

const signUpSchema: yup.SchemaOf<SignUp> = yup.object().shape({
  email: yup.string().email(WRONG_EMAIL).required(REQUIRED),
  password: passwordSchema,
  firstName: yup.string().required(REQUIRED),
  lastName: yup.string().required(REQUIRED),
});

export function Register() {
  const [userExists, setUserExists] = useState<boolean>(false);
  const { handleSubmit, control } = useForm<SignUp>({
    mode: 'onSubmit',
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    postSignUp(data)
      .then((result) => console.log(result.message))
      .catch((err) => {
        if (err.response.status === 409) setUserExists(true);
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
      <form onSubmit={onSubmit} className={styles.inputContainer}>
        <Typography fontSize={25}>Register</Typography>
        {userExists && (
          <Alert severity="error">
            The email address you entered already exists in our database. Please, try
            logging in or enter a different email address.
          </Alert>
        )}
        <Input name="firstName" control={control} placeholder="First name" />
        <Input name="lastName" control={control} placeholder="Last name" />
        <Input name="email" control={control} placeholder="Email" />
        <Input
          name="password"
          control={control}
          placeholder="Password"
          type="password"
        />
        <Button onClick={onSubmit} variant="contained" sx={{ paddingBlock: '1em' }}>
          {SIGN_UP}
        </Button>
      </form>
      <RegisterOrLogIn
        screenName="/account/login"
        buttonName={SIGN_IN}
        title="Already registered?"
      />
    </Box>
  );
}
