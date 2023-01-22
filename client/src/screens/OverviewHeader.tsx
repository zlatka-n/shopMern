import { Typography } from "@mui/material";
import { fontSizes } from "../components/shared/styles";

type Props = {
 heading: string;
 text: string;
};

export const OverviewHeader = ({ heading, text }: Props) => {
 return (
  <>
   <Typography fontSize={fontSizes.large}>{heading}</Typography>
   <Typography paddingY={2}>{text} </Typography>
  </>
 );
};
