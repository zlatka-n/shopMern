import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { ResetOldPassword } from '../components/register/ResetOldPassword';
import { GoToHomepage } from '../components/shared/GoToHomepage';
import { styles } from '../components/shared/styles';

export function ResetPassword() {
  const query = new URLSearchParams(useLocation().search);
  const resetToken = query.get('token');
  const userId = query.get('userId');

  return (
    <Box
      height="90vh"
      marginX={10}
      display="flex"
      flexDirection="column"
      marginTop={5}
    >
      <div className={styles.inputContainer}>
        {resetToken && userId ? (
          <ResetOldPassword resetToken={resetToken} userId={userId} />
        ) : (
          <GoToHomepage />
        )}
      </div>
    </Box>
  );
}
