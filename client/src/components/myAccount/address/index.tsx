import { Box } from "@mui/material";
import { getAddresses } from "../../../api/myaccount";
import { OverviewHeader } from "../../../screens/OverviewHeader";
import { ADDRESSES } from "../utils";
import { AllAddresses } from "./AllAddresses";
import { useQuery } from "react-query";

export const Address = () => {
 const {
  isLoading,
  isError,
  data: userData,
 } = useQuery("addresses", getAddresses);

 if (isLoading) return "Loading";

 if (isError) return "Error";

 return (
  <Box maxWidth={"75vw"}>
   <OverviewHeader
    heading={ADDRESSES}
    text="Here you can add or edit your adresses"
   />
   <AllAddresses addresses={userData?.addresses} />
  </Box>
 );
};
