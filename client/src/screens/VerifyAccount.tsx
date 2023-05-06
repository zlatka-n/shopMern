import { useLocation } from "react-router-dom";

export const VerifyAccount = () => {
 const query = new URLSearchParams(useLocation().search);
 const token = query.get("token");
 const email = query.get("email");

 return <div>VerifyAccount</div>;
};
