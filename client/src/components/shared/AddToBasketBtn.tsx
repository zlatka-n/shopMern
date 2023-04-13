import { Button } from "@mui/material";

type Props = {
 onClick: () => void;
};

export const AddToBasketBtn = ({ onClick }: Props) => {
 return (
  <Button
   variant="contained"
   sx={{ marginY: 2, textTransform: "none" }}
   onClick={onClick}
  >
   Add to basket
  </Button>
 );
};
