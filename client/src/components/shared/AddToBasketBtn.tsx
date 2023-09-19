import { Button, CircularProgress } from '@mui/material';

type Props = {
 onClick: () => void;
 isLoading: boolean;
};

export function AddToBasketBtn({ onClick, isLoading }: Props) {
  return (
    <Button
      variant="contained"
      sx={{ marginY: 2, textTransform: 'none', minWidth: 120 }}
      onClick={onClick}
    >
      {isLoading ? <CircularProgress color="info" size={25} /> : 'Add to basket'}
    </Button>
  );
}
