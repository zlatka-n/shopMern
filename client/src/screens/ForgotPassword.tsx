import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { object, SchemaOf, string } from 'yup';
import { postForgotPassword } from '../api/auth';
import { Input } from '../components/shared/Input';
import { fontSizes, styles } from '../components/shared/styles';
import { FORGOT_PASSWORD, REQUIRED, WRONG_EMAIL } from '../shared/constants';
import { Email } from '../shared/types';

const emailSchema: SchemaOf<Email> = object().shape({
  email: string().email(WRONG_EMAIL).required(REQUIRED),
});

export function ForgotPassword() {
  const { mutate } = useMutation((email: string) => postForgotPassword(email));

  const { handleSubmit, control } = useForm<Email>({
    resolver: yupResolver(emailSchema),
  });

  const navigate = useNavigate();

  const onClickContinue = handleSubmit(async (data) => {
    mutate(data.email);

    navigate(`/${FORGOT_PASSWORD}/instructions`, {
      state: { email: data.email },
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
      <form className={styles.inputContainer} onSubmit={onClickContinue}>
        <Typography fontSize={fontSizes.large} fontWeight={500}>
          Recover your email
        </Typography>
        <Typography>
          Enter the email address associated with your account and we will send you a
          password reset link.
        </Typography>
        <Input name="email" control={control} placeholder="Email" />
        <Button
          onClick={onClickContinue}
          variant="contained"
          sx={{ paddingBlock: '1em' }}
        >
          Continue
        </Button>
      </form>
    </Box>
  );
}
