import { Grid, IconButton, Stack, Typography } from "@mui/material";
import { CartItem } from "../../api/types";
import { colors, fontSizes } from "../shared/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm } from "react-hook-form";
import { Select } from "../shared/Select";
import { useEffect } from "react";
import { itemQtySelection } from "../../shared/constants";

type Props = {
 product: CartItem;
 onClickRemove: () => void;
};

export const ItemCard = ({ product, onClickRemove }: Props) => {
 const totalProductPrice = product.qty * product.price;
 const { control, setValue } = useForm<any>();

 useEffect(() => {
  setValue(product._id, product.qty);
 }, []);

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
    <Typography fontSize={fontSizes.medium} lineHeight={2}>
     {product.title}
    </Typography>
    <Typography fontSize={fontSizes.small}>{product.author}</Typography>
    <Typography
     fontSize={fontSizes.medium}
     lineHeight={2}
     color={colors.orange}
    >
     {product.price} EUR
    </Typography>
   </Grid>
   <Grid>
    <Stack direction={"row"} alignItems="center" spacing={2}>
     <Typography>Quantity:</Typography>
     <Select
      control={control}
      name={product._id}
      defaultValue={product.qty}
      data={itemQtySelection}
     />
    </Stack>
    <Typography
     fontSize={fontSizes.medium}
     color={colors.orange}
     lineHeight={2}
    >
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
