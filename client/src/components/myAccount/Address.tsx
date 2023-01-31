import { Button, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAddresses } from "../../api/myaccount";
import { OverviewHeader } from "../../screens/OverviewHeader";
import { fontSizes } from "../shared/styles";
import { ADDRESSES } from "./utils";
import EditIcon from "@mui/icons-material/Edit";
import { Address as AdressType, UserNames } from "../../api/types";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "../shared/Input";
import { AddressCard } from "./AddressCard";

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

 const onEditClick = (index: string) => () => {
  console.log(index);
 };

 console.log({ addresses });
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
    </div>
   ) : null}
   <AddressCard addresses={addresses} />

   <form>
    <Grid container justifyContent={"center"}>
     {fields.map((item, index) => {
      // console.log({ item });
      return (
       <Grid item xs={4} key={item.id}>
        <Input name={`address.${index}.address`} control={control} />
        <Input name={`address.${index}.zipCode`} control={control} />
        <Input key={item.id} name={`address.${index}.city`} control={control} />
        <Input name={`address.${index}.country`} control={control} />
        <Button
         variant="outlined"
         startIcon={<EditIcon />}
         onClick={onEditClick(item.id)}
        >
         Edit
        </Button>
       </Grid>
      );
     })}
    </Grid>
   </form>
   {/* </Grid> */}
  </div>
 );
};
