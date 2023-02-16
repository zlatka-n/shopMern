import { Button, Typography } from "@mui/material";
import { Address } from "../../../api/types";

type Props = Omit<Address, "_id">;

export const AddressCard = ({
 address,
 city,
 zipCode,
 country,
 additionalInfo,
 onClick,
}: Props & { onClick: () => void }) => {
 console.log(country);
 return (
  <>
   <Typography>{address}</Typography>
   <Typography>{city}</Typography>
   <Typography>{zipCode}</Typography>
   <Typography>{country}</Typography>
   {additionalInfo ? <Typography>{additionalInfo}</Typography> : null}
   <Button variant="outlined" onClick={onClick}>
    Edit
   </Button>
  </>
 );
};
