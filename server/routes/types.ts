import { ObjectId } from "bson";

export type User = {
 _id: ObjectId;
 firstName: string;
 lastName: string;
 email: string;
 password: string;
};
