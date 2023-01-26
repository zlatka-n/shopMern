import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAddresses } from "../../api/myaccount";
import { OverviewHeader } from "../../screens/OverviewHeader";
import { fontSizes } from "../shared/styles";
import { ADDRESSES } from "./utils";
import EditIcon from "@mui/icons-material/Edit";
import { Address as AdressType, UserNames } from "../../api/types";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "../shared/Input";

export const Address = () => {
 const [addresses, setAddresses] = useState<AdressType[]>([]);
 const [name, setName] = useState<UserNames | undefined>(undefined);

 const { control } = useForm();

 const { fields, replace } = useFieldArray({
  control,
  name: "address",
 });

 useEffect(() => {
  getAddresses().then((result) => {
   setName(result.userInfo);
   setAddresses(result.addresses);

   replace(result.addresses);
  });
 }, []);

 console.log(fields);
 return (
  <div>
   <OverviewHeader
    heading={ADDRESSES}
    text="Here you can add or edit your adresses"
   />
   {addresses.length > 0 ? (
    <div>
     <Typography fontSize={fontSizes.medium} fontWeight={600} marginBottom={1}>
      {`${name?.firstName} ${name?.lastName}`}
     </Typography>

     <Typography>{addresses[0].address}</Typography>
     <Typography>{addresses[0].city}</Typography>
     <Typography>{addresses[0].zipCode}</Typography>
     <Typography>{addresses[0].country}</Typography>
    </div>
   ) : null}
   <Button variant="outlined" startIcon={<EditIcon />}>
    Edit
   </Button>
   <form>
    {fields.map((item, index) => {
     console.log(item);
     return <Input name={`address.${index}.address`} control={control} />;
    })}
   </form>
  </div>
 );
};
