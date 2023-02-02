import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAddresses } from "../../../api/myaccount";
import { OverviewHeader } from "../../../screens/OverviewHeader";
import { fontSizes } from "../../shared/styles";
import { ADDRESSES } from "../utils";
import { Address as AdressType, UserNames } from "../../../api/types";
import { AddressCard } from "./AddressCard";

export const Address = () => {
 const [addresses, setAddresses] = useState<AdressType[]>([]);
 const [name, setName] = useState<UserNames | undefined>(undefined);

 useEffect(() => {
  getAddresses().then((result) => {
   setName(result.userInfo);
   setAddresses(result.addresses);
  });
 }, []);

 return (
  <div>
   <OverviewHeader
    heading={ADDRESSES}
    text="Here you can add or edit your adresses"
   />
   {addresses.length > 0 ? (
    <div>
     <Typography fontSize={fontSizes.medium} fontWeight={600} marginBottom={1}>
      {`${name?.firstName} ${name?.lastName}`}
     </Typography>
    </div>
   ) : null}
   <AddressCard addresses={addresses} />

   <form>
    <Grid container justifyContent={"center"}></Grid>
   </form>
  </div>
 );
};
