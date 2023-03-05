import { ObjectId, Timestamp } from "bson";

export type User = {
 _id: ObjectId;
 firstName: string;
 lastName: string;
 email: string;
 password: string;
};

export type Address = {
 address: string;
 city: string;
 zipCode: string;
 country: string;
 additionalInfo: string;
 _id: ObjectId;
 created: Timestamp;
};

export type Product = {
 _id: ObjectId;
 title: string;
 author: string;
 price: number;
 image: string;
};
