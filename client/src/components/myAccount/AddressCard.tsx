import { Typography } from "@mui/material";
import { Address } from "../../api/types";

type Props = {
 addresses: Address[];
};

export const AddressCard = ({ addresses }: Props) => {
 return (
  <>
   {addresses?.length > 0
    ? addresses.map(({ address, city, zipCode, country, additionalInfo }) => {
       return (
        <div>
         <Typography>{address}</Typography>
         <Typography>{city}</Typography>
         <Typography>{zipCode}</Typography>
         <Typography>{country}</Typography>
         {additionalInfo ? <Typography>{additionalInfo}</Typography> : null}
        </div>
       );
      })
    : null}
  </>
 );
};
