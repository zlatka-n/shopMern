import { useMutation } from "react-query";
import { useLocation } from "react-router-dom";
import { VerifyAccount as VerifyAccountType } from "../api/types";
import { postVerifyAccount } from "../api/auth";
import { useEffect } from "react";

export const VerifyAccount = () => {
 const query = new URLSearchParams(useLocation().search);
 const token = query.get("token");
 const email = query.get("email");

 const { mutate } = useMutation({
  mutationFn: (reqBody: VerifyAccountType) => postVerifyAccount(reqBody),
 });

 useEffect(() => {
  if (token && email) mutate({ token, email });
 }, []);

 return <div>VerifyAccount</div>;
};
