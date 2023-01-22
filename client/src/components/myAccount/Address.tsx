import { OverviewHeader } from "../../screens/OverviewHeader";
import { ADDRESSES } from "./utils";

export const Address = () => {
 return (
  <div>
   <OverviewHeader
    heading={ADDRESSES}
    text="Here you can add or edit your adresses"
   />
  </div>
 );
};
