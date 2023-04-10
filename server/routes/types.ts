import { ObjectId, Timestamp } from "bson";

export type User = {
 _id: ObjectId;
 firstName: string;
 lastName: string;
 email: string;
 password: string;
 resetToken: string | null;
 resetTokenExpiration: string | null;
};

export type UserValue = {
 value: User;
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

type Details = {
 format: string;
 dimensions: string;
 language: string;
 publicationDate: string;
 ISBN10: string;
 ISBN13: string;
};

export type ProductDetails = {
 _id: string;
 description: string;
 details: Details;
 basicInfo: Product;
};

export type UpdateOneResult = {
 acknowledged: boolean;
 modifiedCount: number;
 upsertedId: null | ObjectId;
 upsertedCount: number;
 matchedCount: number;
};

export type CartItem = {
 productId: ObjectId;
 qty: number;
 price: number;
 _id: ObjectId;
};
