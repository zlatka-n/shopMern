import { colors, Grid, IconButton, Typography } from "@mui/material";
import { CartItem } from "../../api/types";
import { fontSizes } from "../shared/styles";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
 product: CartItem;
 onClickRemove: () => void;
};

export const ItemCard = ({ product, onClickRemove }: Props) => {
 const totalProductPrice = product.qty * product.price;

 return (
  <Grid
   key={product._id}
   display="flex"
   paddingX={2}
   paddingBottom={4}
   sx={{
    borderBottom: `2px solid ${colors.grey}`,
    "&:last-child": { borderBottom: "0px" },
    "&:first-of-type": { paddingTop: 2 },
   }}
  >
   <img src={product.image} width={150} height={200} />
   <Grid item marginLeft={3} xs={7}>
    <Typography fontSize={fontSizes.medium}>{product.title}</Typography>
    <Typography fontSize={fontSizes.small}>{product.author}</Typography>
    <Typography fontSize={fontSizes.medium} color={colors.orange}>
     {product.price} EUR
    </Typography>
   </Grid>
   <Grid>
    <Typography>Quantity: {product.qty}</Typography>
    <Typography fontSize={fontSizes.medium} color={colors.orange}>
     {totalProductPrice} EUR
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
};
