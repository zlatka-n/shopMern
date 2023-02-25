import { User } from "../routes/types";

declare global {
 namespace Express {
  export interface Request {
   user?: User;
  }
 }
}
