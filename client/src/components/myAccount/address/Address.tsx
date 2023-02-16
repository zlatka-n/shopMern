import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAddresses } from "../../../api/myaccount";
import { OverviewHeader } from "../../../screens/OverviewHeader";
import { fontSizes } from "../../shared/styles";
import { ADDRESSES } from "../utils";
import { UserNames } from "../../../api/types";
import { AddressCards } from "./AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { selectAddresses, setAddresses } from "../../../redux/userInfoSlice";

export const Address = () => {
 const addresses = useSelector(selectAddresses);
 const [name, setName] = useState<UserNames | undefined>(undefined);
 const dispatch = useDispatch();

 useEffect(() => {
  getAddresses().then((result) => {
   setName(result.userInfo);
   dispatch(setAddresses(result.addresses));
  });
 }, []);

 return (
  <div>
   <OverviewHeader
    heading={ADDRESSES}
    text="Here you can add or edit your adresses"
   />
   {addresses?.length > 0 ? (
    <div>
     <Typography fontSize={fontSizes.medium} fontWeight={600} marginBottom={1}>
      {`${name?.firstName} ${name?.lastName}`}
     </Typography>
    </div>
   ) : null}
   <AddressCards addresses={addresses} />

   <form>
    <Grid container justifyContent={"center"}></Grid>
   </form>
  </div>
 );
};
