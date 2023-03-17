import { useLocation } from "react-router-dom";
import { FORGOT_PASSWORD } from "../shared/constants";

export const ResetPasswordInstruction = () => {
 const { state } = useLocation();
 const { route } = state ?? {};
 return (
  <div>
   <div>
    {route === FORGOT_PASSWORD
     ? "Here you have instructions"
     : "This page is not available"}
   </div>
  </div>
 );
};
