import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Input } from '../shared/Input';
import { fontSizes, styles } from '../shared/styles';
import { passwordSchema } from '../../shared/schemas';
import { ResetPassword } from '../../shared/types';
import { REQUIRED } from '../../shared/constants';
import { postResetPassword } from '../../api/auth';
import { ResetPassword as ResetPasswordAxios } from '../../api/types';

const resetPasswordSchema: yup.SchemaOf<ResetPassword> = yup.object().shape({
  password: passwordSchema,
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Your passwords do not match.')
    .required(REQUIRED),
});

type Props = {
 resetToken: string;
 userId: string;
};
export function ResetOldPassword({ resetToken, userId }: Props) {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<ResetPassword>({
    mode: 'onSubmit',
    resolver: yupResolver(resetPasswordSchema),
  });

  const { mutate } = useMutation(
    (reqBody: ResetPasswordAxios) => postResetPassword(reqBody),
    {
      onSuccess: () => navigate('/account/login'),
    },
  );

  const onSubmit = handleSubmit(async (data) => {
    const requestBody = { password: data.password, resetToken, userId };
    mutate(requestBody);
  });

  return (
    <Box
      height="90vh"
      marginY={10}
      display="flex"
      flexDirection="column"
      marginTop={5}
    >
      <form onSubmit={onSubmit} className={styles.inputContainer}>
        <Typography fontSize={fontSizes.large}>Choose your new password</Typography>
        <Input
          name="password"
          control={control}
          placeholder="New password"
          type="password"
        />

        <Input
          name="passwordConfirmation"
          control={control}
          placeholder="Confirm password"
          type="password"
        />
      </form>
      <Button
        variant="contained"
        sx={{ paddingBlock: '1rem', marginTop: '2rem' }}
        onClick={onSubmit}
      >
        Reset password
      </Button>
    </Box>
  );
}
