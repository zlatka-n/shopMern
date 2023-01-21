import { Typography } from "@mui/material";
import { fontSizes } from "../components/shared/styles";

export const OverviewHeader = ({ name }: { name: string }) => {
 return (
  <>
   <Typography fontSize={fontSizes.large}>Hello {name},</Typography>
   <Typography paddingY={2}>
    Welcome to your account. Here you can control orders, returns or edit
    personal information.
   </Typography>
  </>
 );
};
