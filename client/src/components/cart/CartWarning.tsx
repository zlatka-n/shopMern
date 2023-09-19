import { Alert, Box } from '@mui/material';
import { MAX_ITEM_CART_QTY } from '../../shared/constants';

export function CartWarning() {
  return (
    <Box paddingX={5} paddingY={2}>
      <Alert severity="warning">
        Your quantity per item exceeds
        {' '}
        {MAX_ITEM_CART_QTY}
        , please ensure your
        quantity per item is below
        {MAX_ITEM_CART_QTY}
        . To place your order please
        review and update your order.
      </Alert>
    </Box>
  );
}
