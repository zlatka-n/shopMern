import * as yup from "yup";
import YupPassword from "yup-password";
import { REQUIRED } from "./constants";

YupPassword(yup);

export const passwordSchema = yup
 .string()
 .min(6, "Password must have at least 6 characters")
 .max(20, "Password must have 20 charactesr at most")
 .minUppercase(1, "Password must include uppercase")
 .minNumbers(1, "Password must include number")
 .required(REQUIRED);
