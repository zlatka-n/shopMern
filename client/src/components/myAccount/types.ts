import * as yup from "yup";
import { Address } from "../../api/types";

export const createAddressValidation: yup.SchemaOf<Omit<Address, "_id">> = yup
 .object()
 .shape({
  address: yup.string().required(),
  city: yup.string().required(),
  zipCode: yup.string().required(),
  country: yup.string().required(),
  additionalInfo: yup.string(),
 });
