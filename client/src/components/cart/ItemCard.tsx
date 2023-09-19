import {
  Grid, IconButton, Stack, Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { CartItem } from '../../api/types';
import { colors, fontSizes } from '../shared/styles';
import { Select } from '../shared/Select';
import { itemQtySelection } from '../../shared/constants';
import { putItemQuantity } from '../../api/cart';

type Props = {
 product: CartItem;
 onClickRemove: () => void;
};

export function ItemCard({ product, onClickRemove }: Props) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation((reqBody: any) => putItemQuantity(reqBody), {
    onSuccess: () => queryClient.invalidateQueries('cart'),
  });

  const totalProductPrice = product.qty * product.price;
  const { control, setValue } = useForm<any>();

  useEffect(() => {
    setValue(product._id, product.qty);
  }, []);

  const onChangeSelect = (qty: number) => {
    const reqBody = {
      id: product._id,
      qty,
    };

    mutate(reqBody);
  };

  return (
    <Grid
      key={product._id}
      display="flex"
      paddingX={2}
      paddingBottom={4}
      sx={{
        borderBottom: `2px solid ${colors.grey}`,
        '&:last-child': { borderBottom: '0px' },
        '&:first-of-type': { paddingTop: 2 },
      }}
    >
      <img src={product.image} width={150} height={200} alt="product" />
      <Grid item marginLeft={3} xs={7}>
        <Typography fontSize={fontSizes.medium} lineHeight={2}>
          {product.title}
        </Typography>
        <Typography fontSize={fontSizes.small}>{product.author}</Typography>
        <Typography
          fontSize={fontSizes.medium}
          lineHeight={2}
          color={colors.orange}
        >
          {product.price}
          {' '}
          EUR
        </Typography>
      </Grid>
      <Grid>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography>Quantity:</Typography>
          <Select
            control={control}
            name={product._id}
            defaultValue={product.qty}
            data={itemQtySelection}
            onChangeSelect={onChangeSelect}
          />
        </Stack>
        <Typography
          fontSize={fontSizes.medium}
          color={colors.orange}
          lineHeight={2}
        >
          {totalProductPrice}
          {' '}
          EUR
        </Typography>

        <IconButton
          disableRipple
          edge="start"
          sx={{ paddingTop: 0 }}
          onClick={onClickRemove}
        >
          <DeleteIcon />
          <Typography>Remove</Typography>
        </IconButton>
      </Grid>
    </Grid>
  );
}
