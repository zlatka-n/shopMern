import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { object, SchemaOf, string } from "yup";
import { Input } from "../components/shared/Input";
import { fontSizes, styles } from "../components/shared/styles";
import { REQUIRED, WRONG_EMAIL } from "../shared/constants";
import { Email } from "../shared/types";

const emailSchema: SchemaOf<Email> = object().shape({
 email: string().email(WRONG_EMAIL).required(REQUIRED),
});

export const ForgotPassword = () => {
 const { handleSubmit, control } = useForm<Email>({
  resolver: yupResolver(emailSchema),
 });

 const onClickContinue = handleSubmit(async (data) => {
  console.log({ data });
  alert("TODO: POST: /resetPassword");
 });

 return (
  <Box
   height={"90vh"}
   marginX={10}
   display="flex"
   flexDirection={"column"}
   marginTop={5}
  >
   <form className={styles.inputContainer} onSubmit={onClickContinue}>
    <Typography fontSize={fontSizes.large} fontWeight={500}>
     Recover your email
    </Typography>
    <Typography>
     Enter the email address associated with your account and we'll send you a
     password reset link.
    </Typography>
    <Input name="email" control={control} placeholder="Email" />
    <Button
     onClick={onClickContinue}
     variant="contained"
     sx={{ paddingBlock: "1em" }}
    >
     Continue
    </Button>
   </form>
  </Box>
 );
};
