import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import { Badge, Grid, Stack, IconButton as MuiIconBtn } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useQuery, useQueryClient } from 'react-query';
import { topBarBtns } from './utils';
import {
  selectIsUserLoggedIn,
  setLoginSuccess,
} from '../../redux/accountSlice';
import { IconButton } from '../shared/IconButton';
import { LogInButtons } from './LogInButtons';
import { getLogout } from '../../api/auth';
import { getCart } from '../../api/cart';
import Logo from './logo.svg?react';

export function TopBar() {
  const isLoggedIn = useSelector(selectIsUserLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useQuery('cart', getCart, {
    staleTime: 180000, // 3 mins
    refetchOnMount: false,
  });

  const { refetch } = useQuery('logout', getLogout, {
    enabled: false,
    onSuccess: () => {
      queryClient.invalidateQueries('cart');
      window.sessionStorage.removeItem('userId');
      dispatch(setLoginSuccess(false));
      navigate('account/login');
    },
  });
  const logOutUser = () => {
    refetch();
  };

  const onClickCart = () => {
    navigate('/cart');
  };

  return (
    <AppBar position="static" elevation={0}>
      <Grid container wrap="nowrap" marginY={1} alignItems="center">
        <Logo />
        <Grid item xs={8} marginX={5}>
          <Stack direction="row" alignItems="center" gap={1}>
            {topBarBtns.map(({ icon, name, screen }) => (
              <div key={screen}>
                <IconButton screen={screen} icon={icon} name={name} />
              </div>
            ))}
          </Stack>
        </Grid>

        <Grid item xs={4} marginX={5}>
          <Grid container justifyContent="flex-end">
            {isLoggedIn ? (
              <LogInButtons onClick={logOutUser} />
            ) : (
              <IconButton
                screen="/account/login"
                name="Sign in"
                icon={<Avatar alt="avatar" />}
              />
            )}
            <MuiIconBtn aria-label="cart" onClick={onClickCart} disableRipple>
              <Badge
                badgeContent={data ? data.cart.totalQty : 0}
                color="warning"
              >
                <ShoppingCartIcon sx={{ color: 'white' }} />
              </Badge>
            </MuiIconBtn>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
}
