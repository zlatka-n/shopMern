import { Typography } from "@mui/material";
import { resetInstructions } from "./utils";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { fontSizes } from "../shared/styles";
import { Link } from "react-router-dom";
export type Props = {
 email: string;
};
export const ResetInstructions = ({ email }: Props) => {
 return (
  <>
   <Typography fontSize={fontSizes.large}>Renew your password</Typography>
   <Typography display="flex" alignContent={"center"} gap={1}>
    <CheckCircleIcon color="success" />
    {`Instructions for renewal were sent to ${email}`}
   </Typography>
   <div>
    <Typography>Didn't receive your recovery link?</Typography>
    {resetInstructions.map(({ instruction }, index) => (
     <Typography lineHeight={1.5} key={instruction}>{`${
      index + 1
     }. ${instruction}`}</Typography>
    ))}
   </div>
   <Link to="/account/login" style={{ textDecoration: "none" }}>
    {" "}
    <Typography color={"primary"} textTransform="none">
     Back to login
    </Typography>
   </Link>
  </>
 );
};
