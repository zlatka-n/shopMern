import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { ResetInstructions } from '../components/register/ResetInstructions';
import { GoToHomepage } from '../components/shared/GoToHomepage';
import { styles } from '../components/shared/styles';
import { CompanyLogo } from '../components/shared/CompanyLogo';

export function ResetPasswordInstruction() {
  const { state } = useLocation();
  const { email } = state ?? {};
  return (
    <Box
      height="90vh"
      marginX={10}
      display="flex"
      flexDirection="column"
      marginTop={5}
    >
      <CompanyLogo />
      <div className={styles.inputContainer}>
        {email ? <ResetInstructions email={email} /> : <GoToHomepage />}
      </div>
    </Box>
  );
}
