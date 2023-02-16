import { Box } from "@mui/material";
import { useEffect } from "react";
import { getAddresses } from "../../../api/myaccount";
import { OverviewHeader } from "../../../screens/OverviewHeader";
import { ADDRESSES } from "../utils";
import { AllAddresses } from "./AllAddresses";
import { useDispatch, useSelector } from "react-redux";
import { selectAddresses, setAddresses } from "../../../redux/userInfoSlice";

export const Address = () => {
 const addresses = useSelector(selectAddresses);
 const dispatch = useDispatch();

 useEffect(() => {
  getAddresses().then((result) => {
   dispatch(setAddresses(result.addresses));
  });
 }, []);

 return (
  <Box maxWidth={"75vw"}>
   <OverviewHeader
    heading={ADDRESSES}
    text="Here you can add or edit your adresses"
   />
   <AllAddresses addresses={addresses} />
  </Box>
 );
};
