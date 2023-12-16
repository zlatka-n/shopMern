import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { getVerifyAccount } from '../api/auth';
import { GoToHomepage } from '../components/shared/GoToHomepage';
import { styles } from '../components/shared/styles';
import { CompanyLogo } from '../components/shared/CompanyLogo';

export function VerifyAccount() {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');
  const email = query.get('email');

  const urlParams = {
    token,
    email,
  };

  const { isLoading, isSuccess } = useQuery(
    ['getVerifyAccountId', urlParams],
    () => getVerifyAccount(urlParams),
    {
      refetchOnMount: false,
      retry: 1,
    }
  );

  const displayVerificationStatus = () => {
    let title;
    let text;

    if (isSuccess) {
      title = 'Success';
      text = 'Your account has been verified.';
    }

    if (isLoading) {
      return (
        <Box display="flex" justifyContent="center">
          <CircularProgress />{' '}
        </Box>
      );
    }

    return (
      <div className={styles.inputContainer}>
        <GoToHomepage title={title} text={text} />
      </div>
    );
  };

  return (
    <Box
      height="90vh"
      marginX={10}
      display="flex"
      flexDirection="column"
      marginTop={5}
    >
      <CompanyLogo />
      {displayVerificationStatus()}
    </Box>
  );
}
