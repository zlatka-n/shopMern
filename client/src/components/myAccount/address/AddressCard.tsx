import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Address } from "../../../api/types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

type Props = Omit<Address, "_id">;

export const AddressCard = ({
 address,
 city,
 zipCode,
 country,
 additionalInfo,
 onClick,
}: Props & { onClick: () => void }) => {
 return (
  <Grid
   container
   flexDirection={"column"}
   justifyContent={"space-between"}
   border={"1px solid"}
   paddingX={5}
   minHeight={"30rem"}
  >
   <Grid marginTop={10} container flexDirection={"column"}>
    <Typography>{address}</Typography>
    <Typography>{city}</Typography>
    <Typography>{zipCode}</Typography>
    <Typography>{country}</Typography>
   </Grid>
   {additionalInfo ? <Typography>{additionalInfo}</Typography> : null}
   <Grid container gap={2} marginBottom={10}>
    <IconButton
     onClick={onClick}
     style={{
      border: "2px solid black",
      color: "black",
      borderRadius: 0,
      width: "10rem",
     }}
    >
     <EditIcon />
     <Typography paddingX={1}>Edit</Typography>
    </IconButton>
    <IconButton
     style={{ border: "2px solid black", color: "black", borderRadius: 0 }}
    >
     <DeleteIcon />
    </IconButton>
   </Grid>
  </Grid>
 );
};
