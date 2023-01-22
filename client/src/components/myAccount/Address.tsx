import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAddresses } from "../../api/myaccount";
import { OverviewHeader } from "../../screens/OverviewHeader";
import { fontSizes } from "../shared/styles";
import { ADDRESSES } from "./utils";

export const Address = () => {
 const [addresses, setAddresses] = useState([]);
 const [name, setName] = useState({});

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
      {`${name.firstName} ${name.lastName}`}
     </Typography>

     <Typography>{addresses[0].address}</Typography>
     <Typography>{addresses[0].city}</Typography>
     <Typography>{addresses[0].zipCode}</Typography>
     <Typography>{addresses[0].country}</Typography>
    </div>
   ) : null}
  </div>
 );
};
